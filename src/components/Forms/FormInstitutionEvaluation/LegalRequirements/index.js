import React from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import useForm from '../../../../hooks/useForm';
import api from '../../../../services/api';

export default ({ formId, requirement, handleModal, handleSideBar }) => {
  const callbackFunction = async () => {
    try {
      if (requirement) {
        await api.put(`/forms/${formId}/legal-requirements/${requirement._id}`, data);
        toast.success('Ato alterado com sucesso!');
      } else {
        await api.post(`/forms/${formId}/legal-requirements`, { ...data, formulario: formId });
        toast.success('Ato cadastrado com sucesso!');
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
    requirement ? { ...requirement } : { titulo: '', descricao: '' }
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

