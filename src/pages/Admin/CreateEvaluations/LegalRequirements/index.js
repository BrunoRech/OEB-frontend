import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Icon, Button as ActionButton, Form, Breadcrumb } from 'semantic-ui-react';
import { FormInstitutionEvaluation as FormInstitution } from '../../../../components/Forms';
import { Dashboard } from '../../../../components/Layout';
import api from '../../../../services/api';
import { formatBigText } from '../../../../utils';
import { updateLegalRequirements, fetchForms, findFormName, findFormSituation } from '../FormUtils';
import { ButtonContainer, Modal, CustomTable, HeaderButtonContainer, Button, Select } from '../styles';

export default ({ history, match }) => {
  const [formId, setFormId] = useState(match.params.formId);
  const [showSideBar, handleSideBar] = useState(true);
  const [legalRequirements, setRequirements] = useState([]);
  const [actionsDisabled, setActions] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState([]);
  const [openModalForm, handleModalForm] = useState(false);
  const [openDeletionModal, handleDeletionModal] = useState(false);
  const [requirement, setRequirement] = useState({});

  const COLUMNS = [{
    width: 5,
    path: 'titulo',
    label: 'Título'
  }];

  const ACTION_COLUMN = {
    label: 'Ações',
    content: req => (
      <ButtonContainer>
        <ActionButton
          title="Editar"
          inverted
          color="orange"
          onClick={() => {
            setRequirement(req);
            handleSideBar(false);
            handleModalForm(true);
          }}
          icon={<Icon name="pencil" size="large" />}
        />
        <ActionButton
          title="Excluir"
          inverted
          color="red"
          onClick={() => {
            setRequirement(req);
            handleSideBar(false);
            handleDeletionModal(true);
          }}
          icon={<Icon name="trash" size="large" />}
        />
      </ButtonContainer>
    )
  };

  useEffect(() => {
    if (showSideBar) {
      updateLegalRequirements(formId, setLoading, setRequirements);
      fetchForms(setLoading, setForms);
    }
  }, [setLoading, formId, showSideBar]);

  useEffect(() => {
    findFormSituation(forms, formId, setActions);
  }, [formId, setActions, forms]);

  const handleDeleteRequirement = async () => {
    try {
      await api.delete(`/forms/${formId}/legal-requirements/${requirement._id}`);
      toast.success('Ato excluído com sucesso!');
      handleDeletionModal(false);
      handleSideBar(true);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  return (
    <>
      <Dashboard adm showSideBar={showSideBar} title="Atos legais e normativos">
        <Form loading={loading}>
          <Select
            label="Avaliação"
            options={forms}
            value={formId}
            onChange={(event, { value }) => {
              setFormId(value);
              updateLegalRequirements(value, setLoading, setRequirements);
            }}
          />
        </Form>
        <HeaderButtonContainer>
          <Button
            primary
            floated="right"
            onClick={() => updateLegalRequirements(formId, setLoading, setRequirements)}
            disabled={loading}
          >
            Atualizar
          </Button>
          {!actionsDisabled && (
            <Button
              color="green"
              onClick={() => {
                setRequirement(null);
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
          data={legalRequirements}
          columns={actionsDisabled ? COLUMNS : [...COLUMNS, ACTION_COLUMN]}
          notFoundMessage="Nenhum requisito foi encontrado"
        />
        <Button color="blue" onClick={() => history.push('/formularios')}>
          Voltar
        </Button>
      </Dashboard>

      <Modal open={openModalForm}>
        <Modal.Header>
          <React.Fragment>
            <Breadcrumb size="huge">
              <Breadcrumb.Section>
                <span title={findFormName(forms, formId)}>{formatBigText(findFormName(forms, formId), 20)}</span>
              </Breadcrumb.Section>
              <Breadcrumb.Divider />
              <Breadcrumb.Section>
                <span title={requirement ? formatBigText(requirement.titulo, 20) : 'Requisitos legais e normativos'}>
                  {requirement ? formatBigText(requirement.titulo, 20) : 'Requisitos legais e normativos'}
                </span>
              </Breadcrumb.Section>
            </Breadcrumb>
          </React.Fragment>
        </Modal.Header>
        <Modal.Content>
          <FormInstitution.RequirementForm
            handleModal={handleModalForm}
            handleSideBar={handleSideBar}
            formId={formId}
            requirement={requirement}
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
        <Modal.Header>Você deseja mesmo excluir este requisito?</Modal.Header>
        <Modal.Actions>
          <Button primary onClick={handleDeleteRequirement}>
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
    </>
  );
};
