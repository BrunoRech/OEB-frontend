import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Pagination, Button, Form, Icon } from 'semantic-ui-react';
import { Header } from '../Layout';
import { CustomTableInstitution } from '../Tables';
import api from '../../services/api';
import useForm from '../../hooks/useForm';
import {
  PaginateContainer,
  Container,
  FormContainer,
  InlineContainer,
  Label,
  FilterButton,
  TableContainer
} from './styles';

const PublicConsult = ({ isAdm, handleSideBar }) => {
  const [acts, setActs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [openForm, handleForm] = useState(false);

  const callbackUpdate = async activePage => {
    setLoading(true);
    const response = await api.get(!isAdm ? `/public-consult` : '/validate-act', {
      params: {
        ...data,
        actFilter: isAdm ? data.actFilter : 'approved',
        page: activePage ? activePage : 1
      }
    });
    const { docs, totalPages: pages } = response.data;
    setTotalPages(pages);
    setActs(docs);
    setLoading(false);
  };

  const [{ data, handleChange, loading, setLoading, handleSubmit, handleSelectChange }] = useForm(callbackUpdate, {
    actFilter: 'notSeen'
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response;
      if (!isAdm) {
        response = await api.get('/public-consult');
      } else {
        response = await api.get('/validate-act', {
          params: {
            actFilter: 'notSeen',
            page: 1
          }
        });
      }
      const { docs, totalPages: pages } = response.data;
      setTotalPages(pages);
      setActs(docs);
      setLoading(false);
    };

    fetchData();
  }, [isAdm, setLoading]);

  const removeActFromList = act => {
    const result = acts.filter(actElement => {
      return actElement._id !== act._id;
    });
    setActs(result);
  };

  const handleApprove = async data => {
    try {
      const { instituicao, _id: actId } = data;
      await api.put(`/validate-act/${instituicao._id}/approve/${actId}`);
      toast.success('Avaliação feita com sucesso');
      removeActFromList(data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  };

  const handleDisapprove = async (comments, data) => {
    try {
      const { instituicao, _id: actId } = data;
      await api.put(`/validate-act/${instituicao._id}/disapprove/${actId}`, { message: comments });
      toast.success('Avaliação feita com sucesso');
      removeActFromList(data);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
  };

  return (
    <>
      {!isAdm && <Header />}
      <Container isAdmin={isAdm}>
        <Button primary floated="right" onClick={() => callbackUpdate()} disabled={loading}>
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
              <Form.Input label="Nome" name="nome" onChange={handleChange} />
              <Form.Input label="Endereço" name="endereco" onChange={handleChange} />
              <Form.Input label="Município" name="municipio" onChange={handleChange} />
              <Form.Input label="Etapa de Ensino" name="curso" onChange={handleChange} />
              {isAdm && (
                <>
                  <Label>Situação</Label>
                  <Form.Checkbox
                    label="Reprovados"
                    checked={data.actFilter === 'disapproved'}
                    value="disapproved"
                    onChange={handleSelectChange}
                    name="actFilter"
                  />
                  <Form.Checkbox
                    label="Aprovados"
                    checked={data.actFilter === 'approved'}
                    value="approved"
                    onChange={handleSelectChange}
                    name="actFilter"
                  />
                  <Form.Checkbox
                    label="Não avaliados"
                    checked={data.actFilter === 'notSeen'}
                    value="notSeen"
                    onChange={handleSelectChange}
                    name="actFilter"
                  />
                </>
              )}
              <FilterButton type="submit" primary disabled={loading}>
                Filtrar
              </FilterButton>
            </Form>
          </FormContainer>
          <TableContainer>
            <CustomTableInstitution
              loading={loading}
              isAdm={isAdm}
              acts={acts}
              handleApprove={handleApprove}
              handleDisapprove={handleDisapprove}
              handleSideBar={handleSideBar}
              removeActFromList={removeActFromList}
            />
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
                onPageChange={(event, data) => {
                  callbackUpdate(data.activePage);
                }}
              />
            </PaginateContainer>
          </TableContainer>
        </InlineContainer>
      </Container>
    </>
  );
};

export default PublicConsult;
