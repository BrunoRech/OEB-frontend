import React from 'react';
import { Form } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import useForm from '../../../../hooks/useForm';
import api from '../../../../services/api';

export default ({ indicatorId, description, handleModal, handleSideBar }) => {
  const callbackFunction = async () => {
    try {
      if (!indicatorId) {
        return toast.error('Informe o indicador');
      }
      if (description) {
        await api.put(`/indicators/${indicatorId}/criteria-descriptors/${description._id}`, data);
        toast.success('Descrição alterado com sucesso');
      } else {
        await api.post(`/indicators/${indicatorId}/criteria-descriptors`, data);
        toast.success('Descrição cadastrado com sucesso');
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
    description ? { ...description } : { descricao: '', conceito: '', valorMinimo: '', valorMaximo: '' }
  );

  return (
    <>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Form.Input onChange={handleChange} label="Descrição" name="descricao" value={data.descricao} />
        <Form.Group widths={3}>
          <Form.Input onChange={handleChange} type="number" label="Conceito" name="conceito" value={data.conceito} />
          <Form.Input
            onChange={handleChange}
            type="number"
            label="Valor Mínimo"
            name="valorMinimo"
            value={data.valorMinimo}
          />
          <Form.Input
            onChange={handleChange}
            type="number"
            label="Valor Máximo"
            name="valorMaximo"
            value={data.valorMaximo}
          />
        </Form.Group>
        <Form.Button type="submit" primary floated="right">
          Salvar
        </Form.Button>
      </Form>
    </>
  );
};
