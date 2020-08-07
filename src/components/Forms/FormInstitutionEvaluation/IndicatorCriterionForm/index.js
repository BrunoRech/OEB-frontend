import React from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import useForm from '../../../../hooks/useForm';
import api from '../../../../services/api';

export default ({ indicatorId, criterion, handleModal, handleSideBar }) => {
  const callbackFunction = async () => {
    try {
      if (!indicatorId) {
        return toast.error('Informe o indicador');
      }
      if (criterion) {
        await api.put(`/indicators/${indicatorId}/criteria/${criterion._id}`, data);
        toast.success('Critério alterado com sucesso');
      } else {
        await api.post(`/indicators/${indicatorId}/criteria`, data );
        toast.success('Critério cadastrado com sucesso');
      }

      handleModal && handleModal(false);
      handleSideBar && handleSideBar(true);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  const [{ data, loading, handleChange, handleSubmit }] = useForm(
    callbackFunction,
    criterion ? { ...criterion } : { titulo: '' }
  );

  return (
    <>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Form.TextArea onChange={handleChange} label="Título" name="titulo" value={data.titulo} rows="3" />
        <Form.Button type="submit" primary floated="right">
          Salvar
        </Form.Button>
      </Form>
    </>
  );
};
