import React from 'react';
import { toast } from 'react-toastify';
import { removeSpecialChars } from '../../../utils';
import { FormMaintenedAdm } from '../../../components/Forms';
import { Dashboard } from '../../../components/Layout';
import api from '../../../services/api';
import useForm from '../../../hooks/useForm';

const FinishSignUpAdm = () => {
  const callbackSubmit = async () => {
    const { cpf, senha, senhaComfirmada, telefone } = data;
    const auxAdm = {
      ...data,
      cpf: removeSpecialChars(cpf),
      telefone: removeSpecialChars(telefone)
    };
    if (senha !== senhaComfirmada) {
      toast.error('As senhas não conferem!');
    } else {
      delete auxAdm.senhaComfirmada;
      try {
        await api.post('/admins', auxAdm);
        toast.success('Os dados foram salvos com sucesso.');
        setData({});
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
    }
  };

  const [{ data, loading, handleChange, handleSubmit, setData }] = useForm(callbackSubmit, {});

  return (
    <Dashboard adm title="Cadastrar Administrador" showSideBar>
      <FormMaintenedAdm
        isRegister
        handleInputChange={handleChange}
        values={data}
        loading={loading}
        handleFormSubmit={handleSubmit}
      />
    </Dashboard>
  );
};

export default FinishSignUpAdm;
