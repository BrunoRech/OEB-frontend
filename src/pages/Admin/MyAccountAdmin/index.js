import React, { useState } from 'react';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';
import useForm from '../../../hooks/useForm';
import { Dashboard } from '../../../components/Layout';
import { FormAccountAdm, FormPassword } from '../../../components/Forms';
import api from '../../../services/api';
import { getToken } from '../../../services/auth';
import { removeSpecialChars } from '../../../utils';

export default () => {
  const { id } = decode(getToken());
  const [passForm, setPassForm] = useState(null);

  const handleSubmitCallback = async () => {
    const auxData = { ...data };
    delete auxData._id;
    delete auxData.creatAt;
    delete auxData.__v;
    delete auxData.senha;

    const { cpf, telefone } = auxData;
    auxData.cpf = removeSpecialChars(cpf);
    auxData.telefone = removeSpecialChars(telefone);

    try {
      await api.put(`/admins`, auxData);
      toast.success('Os dados foram atualizados com sucesso.');
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  };

  const [{ data, loading, handleChange, handleSubmit }] = useForm(handleSubmitCallback, {}, `/admins/${id}`);

  return (
    <Dashboard title="Minha Conta" adm showSideBar>
      {passForm ? (
        <FormPassword setPassForm={setPassForm} values={data} adm />
      ) : (
        <FormAccountAdm
          values={data}
          setPassForm={setPassForm}
          renderButtonUpdate
          loading={loading}
          handleFormSubmit={handleSubmit}
          handleInputChange={handleChange}
        />
      )}
    </Dashboard>
  );
};
