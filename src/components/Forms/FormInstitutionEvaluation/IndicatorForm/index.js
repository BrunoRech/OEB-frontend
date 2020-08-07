import React from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import useForm from '../../../../hooks/useForm';
import api from '../../../../services/api';

export default ({ dimensionId, indicator, handleModal, handleSideBar }) => {
  const callbackFunction = async () => {
    try {
      if (!dimensionId) {
        return toast.error('Informe a dimensão');
      }
      if (indicator) {
        await api.put(`/dimensions/${dimensionId}/indicators/${indicator._id}`, data);
        toast.success('Indicador alterado com sucesso!');
      } else {
        await api.post(`/dimensions/${dimensionId}/indicators`, { ...data, dimensao: dimensionId });
        toast.success('Indicador cadastrado com sucesso!');
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
    indicator ? { ...indicator } : { titulo: '' }
  );
  return (
    <>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Form.Input onChange={handleChange} label="Título" name="titulo" value={data.titulo} />
        <Form.Button type="submit" primary floated="right">
          Salvar
        </Form.Button>
      </Form>
    </>
  );
};
