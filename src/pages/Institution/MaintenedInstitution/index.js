import React from 'react';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';
import { Button } from 'semantic-ui-react';
import { Dashboard } from '../../../components/Layout';
import { FormMaintenedInstitution } from '../../../components/Forms';
import api from '../../../services/api';
import { getToken } from '../../../services/auth';
import { removeSpecialChars } from '../../../utils';
import useForm from '../../../hooks/useForm';

const MaintenedInstitution = () => {
  const { id: institutionId } = decode(getToken());

  const callbackSubmit = async () => {
    try {
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
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  };
  const [{ data, loading, handleChange, handleSubmit, handleSelectChange, setLoading }] = useForm(
    callbackSubmit,
    {},
    `/institutions/${institutionId}`
  );

  return (
    <Dashboard title="Dados Institucionais" showSideBar>
      <FormMaintenedInstitution
        values={data}
        loading={loading}
        handleInputChange={handleChange}
        handleSelectChange={handleSelectChange}
        setLoading={setLoading}
        renderButtonUpdate
      />
      <Button primary floated="right" onClick={handleSubmit} disabled={loading}>
        Atualizar
      </Button>
    </Dashboard>
  );
};

export default MaintenedInstitution;
