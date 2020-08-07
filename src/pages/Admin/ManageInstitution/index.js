import React, { useEffect, useState } from 'react';
import { Icon, Pagination, Form, Button, Modal } from 'semantic-ui-react';
import decode from 'jwt-decode';
import { Dashboard } from '../../../components/Layout';
import { CustomTable } from '../../../components/Tables';
import { getToken } from '../../../services/auth';
import api from '../../../services/api';
import { CustomButton, PaginateContainer, FormContainer, FilterButton, InlineContainer, Container } from './styles';
import useForm from '../../../hooks/useForm';

export default ({ isAdm, history }) => {
  const [institutions, setInstitutions] = useState([]);
  const [id, setId] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [openForm, handleForm] = useState(false);
  const [showSideBar, handleSideBar] = useState(true);
  const [openConfirmation, handleConfirmation] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState();

  const handleUpdate = async (event, { activePage }) => {
    setLoading(true);
    const response = await api.get(`/institutions`, {
      params: {
        page: activePage
      }
    });
    const { docs, totalPages: pages } = response.data;
    setTotalPages(pages);
    setInstitutions(docs);
    setLoading(false);
  };

  const [{ data, loading, setLoading, handleChange, handleSubmit }] = useForm(handleUpdate, {});

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      const reponse = await api.get(`/institutions`);
      const { data } = reponse;
      setTotalPages(data.totalPages);
      setInstitutions(data.docs);
      setLoading(false);
    };
    const tokenDecoded = decode(getToken());
    setId(tokenDecoded.id);
    fetchInstitutions();
  }, [id, setLoading]);

  const handleChangeStateInstitution = async state => {
    setLoading(true);
    const { data: response } = await api.put(`/change-institution-state/${selectedInstitution._id}`, {
      ativa: state
    });
    setInstitutions([...institutions.filter(institution => institution._id !== selectedInstitution._id), response]);
    setLoading(false);
    handleConfirmation(false);
    handleSideBar(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.get('/institutions');
      const { docs, totalPages: pages } = response.data;
      setTotalPages(pages);
      setInstitutions(docs);
      setLoading(false);
    };

    fetchData();
  }, [isAdm, setLoading]);

  const columns = [
    {
      width: 2,
      path: 'nomeFantasia',
      label: 'Nome Fantasia'
    },

    {
      width: 2,
      path: 'email',
      label: 'E-mail'
    },

    {
      width: 2,
      path: 'endereco',
      label: 'Endereço'
    },

    {
      width: 1,
      path: 'municipio.nome',
      label: 'Município'
    },
    {
      path: 'editar',
      label: 'Editar',
      content: institutions => (
        <>
          <Button
            title="Editar"
            color="orange"
            inverted
            size="large"
            onClick={() => history.push(`/cadastro-inst/${institutions._id}`)}
            icon={<Icon name="pencil" />}
          />
          {institutions.ativa ? (
            <Button
              title="Desativar instituição"
              color="red"
              inverted
              size="large"
              onClick={() => {
                handleConfirmation(true);
                handleSideBar(false);
                setSelectedInstitution(institutions);
              }}
              icon={<Icon name="close" />}
            />
          ) : (
            <Button
              title="Ativar instituição"
              color="green"
              inverted
              size="large"
              onClick={() => {
                handleConfirmation(true);
                handleSideBar(false);
                setSelectedInstitution(institutions);
              }}
              icon={<Icon name="checkmark" />}
            />
          )}
        </>
      )
    }
  ];

  const ModalInstitution = () => {
    return (
      <>
        {selectedInstitution.ativa ? (
          <>
            <Modal.Header>Desativar instituição</Modal.Header>
            <Modal.Content>Você tem certeza que deseja desativar essa instituição?</Modal.Content>
            <Modal.Actions>
              <Button
                floated="left"
                color="green"
                size="large"
                onClick={() => {
                  handleConfirmation(false);
                  handleSideBar(true);
                }}
              >
                Voltar
              </Button>
              <Button color="red" size="large" onClick={() => handleChangeStateInstitution(false)}>
                Sim
              </Button>
            </Modal.Actions>
          </>
        ) : (
          <>
            <Modal.Header>Reativar Instituição</Modal.Header>
            <Modal.Content>Você tem certeza que quer reativar essa instituição?</Modal.Content>
            <Modal.Actions>
              <>
                <Button
                  floated="left"
                  color="green"
                  inverted
                  size="large"
                  onClick={() => {
                    handleConfirmation(false);
                    handleSideBar(true);
                  }}
                >
                  Voltar
                </Button>

                <Button color="red" inverted size="large" onClick={() => handleChangeStateInstitution(true)}>
                  Sim
                </Button>
              </>
            </Modal.Actions>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Modal open={openConfirmation}>
        <ModalInstitution />
      </Modal>

      <Dashboard adm title="Gerenciar Instituições" showSideBar={showSideBar}>
        <CustomButton onClick={() => history.push('/cadastro-inst')} color="green" disabled={loading}>
          Novo
        </CustomButton>
        <Container>
          <Button primary floated="right" onClick={handleUpdate} disabled={loading}>
            Atualizar
          </Button>
          <Button primary onClick={() => handleForm(!openForm)} disabled={loading}>
            {openForm && <Icon name="arrow left" />}
            Filtros
            {!openForm && <Icon name="arrow right" />}
          </Button>

          <InlineContainer>
            <FormContainer open={openForm}>
              <Form onSubmit={handleSubmit} loading={loading}>
                <Form.Input label="Nome" name="nome" onChange={handleChange} value={data.nome} />
                <Form.Input label="Endereço" name="endereco" onChange={handleChange} value={data.endereco} />
                <Form.Input label="Município" name="municipio" onChange={handleChange} value={data.municipio} />
                <Form.Input label="E-mail" name="email" onChange={handleChange} value={data.email} />

                <FilterButton type="submit" primary disabled={loading}>
                  Filtrar
                </FilterButton>
              </Form>
            </FormContainer>

            <CustomTable
              columns={columns}
              data={institutions}
              handleFilter={handleUpdate}
              notFoundMessage="Nenhuma instituição encontrada"
              loading={loading}
            />
          </InlineContainer>

          <PaginateContainer>
            <Pagination
              disabled={loading}
              boundaryRange={0}
              defaultActivePage={1}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={totalPages}
              onPageChange={handleUpdate}
            />
          </PaginateContainer>
        </Container>
      </Dashboard>
    </>
  );
};
