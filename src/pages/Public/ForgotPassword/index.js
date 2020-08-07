import React from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Sign } from '../../../components/Layout';
import api from '../../../services/api';
import useForm from '../../../hooks/useForm';
import Button from './styles';

const OPTIONS = [
  {
    key: 'emailResponsavel',
    text: 'Responsável',
    value: 'emailResponsavel'
  },
  {
    key: 'emailSecretario',
    text: 'Secretário',
    value: 'emailSecretario'
  },
  {
    key: 'emailDiretor',
    text: 'Diretor',
    value: 'emailDiretor'
  }
];

const ForgotPassword = () => {
  const callbackSubmit = async () => {
    await api.post('/instituicoes/forgot-password', data)
      .then(() => {
        toast.success('E-mail enviado com sucesso! Você será redirecionado para a tela de login.');
      })
      .catch(err => {
        const { error } = err.response.data;
        toast.error(error);
      });
  };

  const [{ data, loading, handleChange, handleSubmit, handleSelectChange }] = useForm(callbackSubmit, {});

  return (
    <Sign title="Esqueceu sua senha">
      <p>Digite o seu e-mail e selecione o seu cargo para enviarmos um link de troca de senha:</p>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Form.Input
          label="Email"
          name="email"
          value={data.email}
          onChange={event => handleChange(event)}
          placeholder="E-mail cadastrado no sistema"
        />
        <Form.Select
          options={OPTIONS}
          value={data.to}
          text={data.to}
          name="to"
          label="Destinatário"
          onChange={handleSelectChange}
          placeholder="Selecione o responsável"
        />
        <Form.Field>
          <Link to="/login">Lembrou sua senha?</Link>
        </Form.Field>
        <Button type="submit" primary size="large">
          Enviar
        </Button>
      </Form>
    </Sign>
  );
};

export default ForgotPassword;
