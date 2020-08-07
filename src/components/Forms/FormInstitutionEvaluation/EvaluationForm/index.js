import React from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import useForm from '../../../../hooks/useForm';
import api from '../../../../services/api';

export default ({ form, handleModal, handleSideBar }) => {
  const callbackFunction = async () => {
    try {
      if (form) {
        if (data.clone) {
          delete data.clone;
          await api.post(`/clone-form/${form._id}`, data);
          toast.success('Formulário clonado com sucesso');
        } else {
          await api.put(`/forms/${form._id}`, data);
          toast.success('Formulário atualizado com sucesso');
        }
      } else {
        await api.post('/forms', data);
        toast.success('Formulário cadastrado com sucesso');
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
    form ? { ...form } : { titulo: '', anoAplicacao: '' }
  );
  return (
    <>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Form.Input onChange={handleChange} label="Título" name="titulo" value={data.titulo} />
        <Form.Input
          onChange={handleChange}
          type="number"
          label="Ano de Aplicação"
          name="anoAplicacao"
          value={data.anoAplicacao}
        />
        <Form.Button type="submit" primary floated="right">
          {form?.clone ? 'Clonar' : 'Salvar'}
        </Form.Button>
      </Form>
    </>
  );
};
