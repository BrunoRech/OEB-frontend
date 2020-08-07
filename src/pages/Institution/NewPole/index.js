import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form } from 'semantic-ui-react';
import { Dashboard } from '../../../components/Layout';
import { Button, Pole } from './styles';
import api from '../../../services/api';
import ibgeApi from '../../../services/ibgeApi';
import useForm from '../../../hooks/useForm';
import { Telephone } from '../../../components/Masks';
import { removeSpecialChars } from '../../../utils';

export default ({ history, match }) => {
  const { id } = match.params;
  const [cities, setCities] = useState([{ key: '', text: '', value: { id: '', nome: '' } }]);

  const callbackSubmit = async () => {
    try {
      if (!match.params.id) {
        await api.post(`/poles`, data);
        toast.success('Os dados foram salvos com sucesso.');
      } else {
        const { telefoneFixo } = data;
        await api.put(`/poles/${id}`, {
          ...data,
          telefoneFixo: removeSpecialChars(telefoneFixo)
        });
        toast.success('Os dados foram atualizados com sucesso.');
      }
      history.push('/polos');
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  };

  const [{ data, loading, handleChange, handleSubmit, setData, handleSelectChange, setLoading }] = useForm(
    callbackSubmit,
    {
      emailResponsavel: '',
      endereco: '',
      municipio: '',
      numero: '',
      telefoneFixo: ''
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.get(`/poles/${id}`);
      setData(response.data);
      setLoading(false);
    };

    if (id) {
      fetchData();
    }
  }, [id, setData, setLoading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ibgeApi.get('v1/localidades/estados/42/municipios');
        const options = [];
        response.data.forEach(city => {
          options.push({
            key: city.id,
            text: city.nome,
            value: {
              id: city.id,
              nome: city.nome
            }
          });
        });
        setCities(options);
      } catch (err) {
        console.log(err);
        toast.error('Ocorreu um erro ao importar os municípios, tente novamente');
      }
      setLoading(false);
    };
    fetchData();
  }, [setLoading]);

  return (
    <Dashboard title={match.params.id ? 'Atualizar polo' : 'Novo  polo'} showSideBar>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Pole>
          <Form.Group widths="equal">
            <Form.Input onChange={handleChange} name="endereco" label="Endereço" value={data.endereco} />
            <Form.Input onChange={handleChange} name="numero" label="Número" value={data.numero} type="number" />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Select
              onChange={handleSelectChange}
              fluid
              name="municipio"
              label="Município"
              options={cities}
              value={data.municipio ? data.municipio.nome : ''}
              text={data.municipio ? data.municipio.nome : ''}
            />
            <Telephone
              onChange={handleChange}
              name="telefoneFixo"
              label="Telefone"
              value={data.telefoneFixo ? data.telefoneFixo : ''}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              onChange={handleChange}
              fluid
              name="emailResponsavel"
              label="E-mail responsável"
              value={data.emailResponsavel}
            />
          </Form.Group>
          <Button onClick={() => history.push('/polos')} color="red">
            Voltar
          </Button>
          <Button type="submit" floated="right" primary>
            Salvar
          </Button>
        </Pole>
      </Form>
    </Dashboard>
  );
};
