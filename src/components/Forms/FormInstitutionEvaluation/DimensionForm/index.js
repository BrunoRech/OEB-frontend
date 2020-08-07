import React from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import useForm from '../../../../hooks/useForm';
import api from '../../../../services/api';

export default ({ formId, dimension, handleModal, handleSideBar }) => {
  const callbackFunction = async () => {
    try {
      if (dimension) {
        await api.put(`/forms/${formId}/dimensions/${dimension._id}`, data);
        toast.success('Dimensão alterada com sucesso!');
      } else {
        await api.post(`/forms/${formId}/dimensions`, { ...data, formulario: formId });
        toast.success('Dimensão cadastrada com sucesso!');
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
    dimension ? { ...dimension } : { titulo: '', descricao: '' }
  );
  return (
    <>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Form.Input onChange={handleChange} label="Título" name="titulo" value={data.titulo} />
        <Form.TextArea onChange={handleChange} label="Descrição" name="descricao" value={data.descricao} rows="8" />
        <Form.Button type="submit" primary floated="right">
          Salvar
        </Form.Button>
      </Form>
    </>
  );
};
