import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Icon, Button as ActionButton, Form, Breadcrumb } from 'semantic-ui-react';
import { ButtonContainer, Modal, CustomTable, HeaderButtonContainer, Button, Select } from '../styles';
import { FormInstitutionEvaluation as FormInstitution } from '../../../../components/Forms';
import api from '../../../../services/api';
import { formatBigText } from '../../../../utils';
import { Dashboard } from '../../../../components/Layout';
import { updateDimensions, fetchForms, findFormName, findFormSituation } from '../FormUtils';

export default ({ history, match }) => {
  const [formId, setFormId] = useState(match.params.formId);
  const [actionsDisabled, setActions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openModalForm, handleModalForm] = useState(false);
  const [openDeletionModal, handleDeletionModal] = useState(false);
  const [showSideBar, handleSideBar] = useState(true);
  const [dimensions, setDimensions] = useState([]);
  const [forms, setForms] = useState([]);
  const [dimension, setDimension] = useState({});

  useEffect(() => {
    if (showSideBar) {
      updateDimensions(formId, setLoading, setDimensions);
      fetchForms(setLoading, setForms);
    }
  }, [setLoading, formId, showSideBar]);

  useEffect(() => {
    findFormSituation(forms, formId, setActions);
  }, [formId, setActions, forms]);

  const TABLE_COLUMNS = [
    {
      width: 5,
      path: 'titulo',
      label: 'Nome'
    },
    {
      label: 'Ações',
      content: dimension => (
        <ButtonContainer>
          <ActionButton
            title="Indicadores"
            inverted
            color="green"
            onClick={() => history.push(`/formularios/${formId}/dimensoes/${dimension._id}/indicadores`)}
            icon={<Icon name="clipboard outline" size="large" />}
          />
          {!actionsDisabled && (
            <>
              <ActionButton
                title="Editar"
                inverted
                color="orange"
                onClick={() => {
                  setDimension(dimension);
                  handleSideBar(false);
                  handleModalForm(true);
                }}
                icon={<Icon name="pencil" size="large" />}
              />
              <ActionButton
                title="Ecluir"
                inverted
                color="red"
                onClick={() => {
                  setDimension(dimension);
                  handleSideBar(false);
                  handleDeletionModal(true);
                }}
                icon={<Icon name="trash" size="large" />}
              />
            </>
          )}
        </ButtonContainer>
      )
    }
  ];

  const handleDeleteDimension = async () => {
    try {
      await api.delete(`/dimensions/${dimension._id}`);
      toast.success('Dimensão excluída com sucesso!');
      handleDeletionModal(false);
      handleSideBar(true);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  return (
    <>
      <Dashboard showSideBar={showSideBar} title="Dimensões" adm>
        <Form loading={loading}>
          <Select
            label="Avaliação"
            options={forms}
            value={formId}
            onChange={(event, { value }) => {
              setFormId(value);
              updateDimensions(value, setLoading, setDimensions);
            }}
          />
        </Form>
        <HeaderButtonContainer>
          <Button
            primary
            floated="right"
            onClick={() => updateDimensions(formId, setLoading, setDimensions)}
            disabled={loading}
          >
            Atualizar
          </Button>
          {!actionsDisabled && (
            <Button
              color="green"
              onClick={() => {
                setDimension(null);
                handleSideBar(false);
                handleModalForm(true);
              }}
              disabled={loading}
            >
              Novo
            </Button>
          )}
        </HeaderButtonContainer>
        <CustomTable
          data={dimensions}
          columns={TABLE_COLUMNS}
          loading={loading}
          notFoundMessage="Nenhuma dimensão encontrada"
        />
        <Button color="blue" onClick={() => history.push('/formularios')}>
          Voltar
        </Button>

        <Modal open={openModalForm}>
          <Modal.Header>
            <React.Fragment>
              <Breadcrumb size="huge">
                <Breadcrumb.Section>
                  <span title={findFormName(forms, formId)}>{formatBigText(findFormName(forms, formId), 20)}</span>
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>
                  <span title={dimension ? formatBigText(dimension.titulo, 20) : 'Dimensões'}>
                    {dimension ? formatBigText(dimension.titulo, 20) : 'Dimensões'}
                  </span>
                </Breadcrumb.Section>
              </Breadcrumb>
            </React.Fragment>
          </Modal.Header>
          <Modal.Content>
            <FormInstitution.DimensionForm
              handleModal={handleModalForm}
              handleSideBar={handleSideBar}
              formId={formId}
              dimension={dimension}
            />
            <Button
              primary
              onClick={() => {
                handleModalForm(false);
                handleSideBar(true);
              }}
            >
              Voltar
            </Button>
          </Modal.Content>
        </Modal>

        <Modal open={openDeletionModal} size="mini">
          <Modal.Header>Você deseja mesmo excluir esta dimensão?</Modal.Header>
          <Modal.Actions>
            <Button primary onClick={handleDeleteDimension}>
              Sim
            </Button>
            <Button
              floated="left"
              primary
              onClick={() => {
                handleDeletionModal(false);
                handleSideBar(true);
              }}
            >
              Não
            </Button>
          </Modal.Actions>
        </Modal>
      </Dashboard>
    </>
  );
};
