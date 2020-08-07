import React, { useState, useEffect } from 'react';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { DatePicker } from '../../../components/Utils';
import { CustomTable } from '../../../components/Tables';
import { Dashboard } from '../../../components/Layout';
import api from '../../../services/api';
import { PolesContainer, FormField, ColumnButton, File } from './styles';
import useForm from '../../../hooks/useForm';

export default ({ handleGoBack, actId }) => {
  const [poles, setPoles] = useState([]);
  const [showModal, handleModal] = useState(false);
  const [showSideBar, handleSideBar] = useState(true);
  const [linkedPoles, setLinkedPoles] = useState([]);
  const [selectedPole, setSelectedPole] = useState({});

  const callbackSubmit = async () => {
    try {
      const { arquivoAto, validadeAto, numeroAto, poleId } = data;
      const bodyFormData = new FormData();
      bodyFormData.append('file', arquivoAto);
      const { data: fileResponse } = await api.post(`/files`, bodyFormData);
      const association = {
        numeroAto,
        arquivoAto: fileResponse._id,
        validadeAto,
        ato: actId,
        polo: poleId
      };
      await api.post('/associate-pole', association);
      setPoles(
        poles.filter(polo => {
          return selectedPole._id !== polo._id;
        })
      );
      const { data: result } = await api.get(`/associate-pole/${actId}`);
      setLinkedPoles(result);
      handleModal(false);
      handleSideBar(true);
      toast.success('Vínculo realizado com sucesso');
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  };

  const [
    { data, loading, handleChange, handleSubmit, setData, handleFileChange, handleDateChange, setLoading }
  ] = useForm(callbackSubmit, {
    validadeAto: '',
    poleId: '',
    numeroAto: '',
    arquivoAto: ''
  });

  useEffect(() => {
    const fetchPoles = async () => {
      setLoading(true);
      const { data: association } = await api.get(`/associate-pole/${actId}`);
      setLinkedPoles(association);
      const { data: polos } = await api.get('/poles');
      setPoles(polos.filter(elem => !association.find(({ polo }) => elem._id === polo._id)));
      setLoading(false);
    };

    try {
      fetchPoles();
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  }, [actId, setLoading]);

  const handleDelete = async association => {
    try {
      setLoading(true);
      await api.delete(`/associate-pole/${association._id}`);
      setLinkedPoles(
        linkedPoles.filter(currentAss => {
          return currentAss.polo._id !== association.polo._id;
        })
      );
      setPoles([...poles, association.polo]);
      toast.success('Polo desvinculado com sucesso');
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
    setLoading(false);
  };

  const vincularColumn = [
    {
      path: 'endereco',
      label: 'Endereço'
    },
    {
      path: 'municipio.nome',
      label: 'Município'
    },
    {
      path: 'emailResponsavel',
      label: 'E-mail Responsável'
    },
    {
      path: 'acao',
      label: 'Ação',
      content: pole => (
        <ColumnButton
          inverted
          onClick={() => {
            setSelectedPole(pole);
            setData({ poleId: pole._id });
            handleModal(true);
            handleSideBar(false);
          }}
          color="green"
          type="button"
        >
          <Icon name="checkmark" /> Vincular
        </ColumnButton>
      )
    }
  ];
  const desvincularColumn = [
    {
      path: 'polo.endereco',
      label: 'Endereço'
    },
    {
      path: 'polo.municipio.nome',
      label: 'Município'
    },
    {
      path: 'polo.emailResponsavel',
      label: 'E-mail Responsável'
    },
    {
      path: 'acao',
      label: 'Ação',
      content: association => (
        <ColumnButton
          inverted
          onClick={() => {
            handleDelete(association);
          }}
          color="red"
          type="button"
        >
          <Icon name="trash" /> Desvincular
        </ColumnButton>
      )
    }
  ];

  return (
    <>
      <Dashboard title="Novo Ato - Vincular Polos" showSideBar={showSideBar}>
        <Form autoComplete="off">
          <PolesContainer>
            <h5>Polos Vinculados</h5>
            <Form.Group widths="equal">
              <CustomTable
                columns={desvincularColumn}
                data={linkedPoles}
                notFoundMessage="Nenhum polo vinculado"
                loading={loading}
              />
            </Form.Group>
          </PolesContainer>
          <PolesContainer>
            <h5>Polos não Vinculados</h5>
            <Form.Group widths="equal">
              <CustomTable
                columns={vincularColumn}
                data={poles}
                notFoundMessage="Nenhum polo encontrado, você possui algum polo cadastrado?"
                loading={loading}
              />
            </Form.Group>
          </PolesContainer>
          <Button floated="right" primary disabled={loading} onClick={handleGoBack}>
            Fechar
          </Button>
        </Form>
      </Dashboard>

      <Modal open={showModal} size="small">
        <Modal.Content>
          <>
            <Form loading={loading}>
              <File
                fluid
                accept="image/x-png,image/gif,image/jpeg"
                label={
                  !data.arquivoAto || data.arquivoAto === '' || data.arquivoAto.file === null
                    ? 'Selecionar Ato Autorizativo'
                    : 'Alterar arquivo'
                }
                name="arquivoAto"
                onChange={event => handleFileChange(event)}
                type="file"
              />

              <Form.Input
                type="number"
                name="numeroAto"
                onChange={handleChange}
                value={data.numeroAto}
                label="Número do Ato"
              />
              <FormField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
                <label>Validade do Ato</label>
                <DatePicker
                  selected={data.validadeAto ? data.validadeAto : ''}
                  handleChange={date => handleDateChange(date, 'validadeAto')}
                  value={data.validadeAto}
                />
              </FormField>
            </Form>
          </>
        </Modal.Content>
        <Modal.Actions>
          <>
            <Button primary onClick={() =>{
              handleSideBar(true);
              handleModal(false);
            }
            } floated="left" disabled={loading}>
              Voltar
            </Button>
            <Button primary onClick={handleSubmit} disabled={loading}>
              Salvar
            </Button>
          </>
        </Modal.Actions>
      </Modal>
    </>
  );
};
