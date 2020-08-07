import React, { useState } from 'react';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { Tab } from 'semantic-ui-react';
import { CNPJ, CPF } from '../../../components/Masks';
import { Sign } from '../../../components/Layout';
import api from '../../../services/api';
import { login } from '../../../services/auth';
import { removeSpecialChars } from '../../../utils';
import { ForgotPasswordLink, Button, LinkContainer, Form } from './styles';
import useForm from '../../../hooks/useForm';

const SignIn = ({ history }) => {
  const [admLogin, setAdmLogin] = useState(false);

  const callbackSubmit = async () => {
    const { password, user } = data;
    try {
      let response;
      if (admLogin) {
        response = await api.post('/admin-sessions', {
          cpf: removeSpecialChars(user),
          senha: password
        });
      } else {
        response = await api.post('/institution-sessions', {
          cnpj: removeSpecialChars(user),
          senha: password
        });
      }
      const { token } = response.data;
      const { isAdmin } = decode(token);
      login(token);
      return isAdmin ? history.push('/dashboardAdm') : history.push('/dashboard');
    } catch (err) {
      console.log(err);
      return toast.error('O Login e/ou a senha estão incorretos.');
    }
  };

  const handleTabChange = (event, { activeIndex }) => {
    setData({
      data: '',
      password: ''
    });
    setAdmLogin(activeIndex === 1);
  };

  const [{ data, loading, handleChange, handleSubmit, setData }] = useForm(callbackSubmit, { data: '', password: '' });

  const panes = [
    {
      menuItem: 'Instituição',
      render: () => (
        <Tab.Pane>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Field>
              <CNPJ placeholder="CNPJ" name="user" onChange={handleChange} value={data.user} />
            </Form.Field>

            <Form.Field>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                onChange={handleChange}
                value={data.password}
              />
            </Form.Field>
            <Button type="submit" primary floated="right">
              Entrar
            </Button>
            <LinkContainer>
              <ForgotPasswordLink to="esqueceu-senha">Recupere sua senha</ForgotPasswordLink>
            </LinkContainer>
          </Form>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Administrador',
      render: () => (
        <Tab.Pane>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Form.Field>
              <CPF placeholder="CPF" name="user" onChange={handleChange} value={data.user} />
            </Form.Field>

            <Form.Field>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                onChange={handleChange}
                value={data.password}
              />
            </Form.Field>
            <Button type="submit" primary floated="right">
              Entrar
            </Button>
            <LinkContainer>
              <ForgotPasswordLink to="#">Recupere sua senha</ForgotPasswordLink>
            </LinkContainer>
          </Form>
        </Tab.Pane>
      )
    }
  ];
  return (
    <Sign title={admLogin ? 'Login do administrador' : 'Login da instituição'}>
      <Tab panes={panes} defaultActiveIndex={0} onTabChange={handleTabChange} />
    </Sign>
  );
};

export default SignIn;
