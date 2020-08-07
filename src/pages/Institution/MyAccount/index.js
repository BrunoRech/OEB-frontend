import React, { useState } from 'react';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';
import api from '../../../services/api';
import { getToken } from '../../../services/auth';
import useForm from '../../../hooks/useForm';
import { Dashboard } from '../../../components/Layout';
import { FormAccount, FormPassword } from '../../../components/Forms';
import { removeSpecialChars } from '../../../utils';

const MyAccount = () => {
  const [passForm, setPassForm] = useState(false);
  const { id: institutionId } = decode(getToken());

  const handleSubmitCallback = async () => {
    const auxData = { ...data };
    delete auxData._id;
    delete auxData.creatAt;
    delete auxData.__v;
    delete auxData.senha;

    const {
      cnpjMantenedora,
      cnpj,
      cep,
      telefoneFixo,
      telefoneCelular,
      telefoneResponsavel,
      telefoneDiretor,
      telefoneSecretario
    } = auxData;
    const auxInstitution = {
      ...auxData,
      cnpjMantenedora: removeSpecialChars(cnpjMantenedora),
      cnpj: removeSpecialChars(cnpj),
      cep: removeSpecialChars(cep),
      telefoneFixo: removeSpecialChars(telefoneFixo),
      telefoneCelular: removeSpecialChars(telefoneCelular),
      telefoneResponsavel: removeSpecialChars(telefoneResponsavel),
      telefoneDiretor: removeSpecialChars(telefoneDiretor),
      telefoneSecretario: removeSpecialChars(telefoneSecretario)
    };
    await api.put(`/institutions/${institutionId}`, auxInstitution);
    toast.success('Os dados foram atualizados com sucesso.');
  };

  const [{ data, loading, handleChange, handleSubmit }] = useForm(
    handleSubmitCallback,
    {},
    `/institutions/${institutionId}`
  );

  return (
    <Dashboard title="Minha Conta" showSideBar>
      {passForm ? (
        <FormPassword setPassForm={setPassForm} values={data} />
      ) : (
        <FormAccount
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

export default MyAccount;
