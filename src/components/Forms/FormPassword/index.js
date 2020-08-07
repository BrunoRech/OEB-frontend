import React from 'react';
import { toast } from 'react-toastify';
import { Button, Form } from 'semantic-ui-react';
import api from '../../../services/api';
import useForm from '../../../hooks/useForm';

const FormPassword = ({ setPassForm, adm }) => {
  const callbackSubmit = async () => {
    try {
      await api.put(adm ? `/change-password/admin` : `/change-password/institution`, data);
      toast.success('Os dados foram atualizados com sucesso.');
      setData({ oldPassword: '', password: '', confirmPassword: '' });
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  };

  const [{ data, loading, handleChange, handleSubmit, setData }] = useForm(callbackSubmit, {});

  return (
    <Form onSubmit={handleSubmit} loading={loading}>
      <Form.Group widths="equal">
        <Form.Input
          onChange={handleChange}
          type="password"
          name="oldPassword"
          label="Senha atual"
          value={data.oldPassword}
        />
        <Form.Input onChange={handleChange} type="password" name="password" label="Nova senha" value={data.password} />
        <Form.Input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          label="Confirmar nova senha"
          value={data.confirmPassword}
        />
      </Form.Group>

      <Button primary floated="right" type="submit" disabled={loading}>
        Salvar
      </Button>
      <Button primary floated="right" disabled={loading} onClick={() => setPassForm(null)}>
        Voltar
      </Button>
    </Form>
  );
};

export default FormPassword;
