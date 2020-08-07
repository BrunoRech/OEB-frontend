import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Icon, Button as ActionButton, Form, Breadcrumb } from 'semantic-ui-react';
import { CustomTable, Modal, ButtonContainer, HeaderButtonContainer, Button, Select } from '../styles';
import { FormInstitutionEvaluation as FormInstitution } from '../../../../components/Forms';
import { formatBigText } from '../../../../utils';
import api from '../../../../services/api';
import { Dashboard } from '../../../../components/Layout';
import {
  findFormSituation,
  updateCriteria,
  fetchForms,
  fetchDimensions,
  fetchIndicators,
  findFormName,
  findDimensionName,
  findIndicatorName
} from '../FormUtils';

export default ({ history, match }) => {
  const [formId, setFormId] = useState(match.params.formId);
  const [dimId, setDimId] = useState(match.params.dimId);
  const [indId, setIndId] = useState(match.params.indId);
  const [actionsDisabled, setActions] = useState(true);
  const [openModalForm, handleModalForm] = useState(false);
  const [showSideBar, handleSideBar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openDeletionModal, handleDeletionModal] = useState(false);
  const [criterion, setCriterion] = useState(null);
  const [criteria, setCriteria] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [forms, setForms] = useState([]);
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    if (showSideBar) {
      updateCriteria(indId, setLoading, setCriteria);
      fetchForms(setLoading, setForms);
    }
  }, [indId, setLoading, setCriteria, setForms, showSideBar]);

  useEffect(() => {
    fetchDimensions(formId, setLoading, setDimensions);
  }, [setLoading, formId, setDimensions]);

  useEffect(() => {
    dimId && fetchIndicators(dimId, setLoading, setIndicators);
  }, [setLoading, dimId, setIndicators]);

  useEffect(() => {
    findFormSituation(forms, formId, setActions);
  }, [formId, forms, setActions]);

  const TABLE_COLUMNS = [
    {
      width: 5,
      path: 'titulo',
      label: 'Nome'
    }
  ];

  const ACTION_COLUMN = {
    label: 'Ações',
    content: criterion => (
      <ButtonContainer>
        <ActionButton
          title="Editar"
          inverted
          color="orange"
          onClick={() => {
            setCriterion(criterion);
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
            setCriterion(criterion);
            handleSideBar(false);
            handleDeletionModal(true);
          }}
          icon={<Icon name="trash" size="large" />}
        />
      </ButtonContainer>
    )
  };

  const handleDeleteCriterion = async () => {
    try {
      await api.delete(`/indicators/${indId}/criteria/${criterion._id}`);
      toast.success('Critério excluído com sucesso!');
      handleDeletionModal(false);
      handleSideBar(true);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  return (
    <>
      <Dashboard title="Critérios" showSideBar={showSideBar} adm>
        <Form loading={loading}>
          <Form.Group>
            <Select
              label="Avaliação"
              options={forms}
              value={formId}
              onChange={(event, { value }) => {
                setFormId(value);
                setCriteria([]);
                setDimensions([]);
                setIndicators([]);
                setDimId(null);
              }}
            />
            <Select
              label="Dimensão"
              options={dimensions}
              value={dimId}
              onChange={(event, { value }) => {
                setDimId(value);
                setCriteria([]);
                setIndicators([]);
                setIndId(null);
              }}
            />
          </Form.Group>
          <Select
            label="Indicador"
            options={indicators}
            value={indId}
            onChange={(event, { value }) => {
              setIndId(value);
              setCriteria([]);
              updateCriteria(value, setLoading, setCriteria);
            }}
          />
        </Form>
        <HeaderButtonContainer>
          <Button
            primary
            floated="right"
            onClick={() => updateCriteria(indId, setLoading, setCriteria)}
            disabled={loading}
          >
            Atualizar
          </Button>
          {!actionsDisabled && (
            <Button
              color="green"
              onClick={() => {
                setCriterion(null);
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
          data={criteria}
          columns={actionsDisabled ? TABLE_COLUMNS : [...TABLE_COLUMNS, ACTION_COLUMN]}
          loading={loading}
          notFoundMessage="Nenhum critério encontrado"
        />
        <Button
          color="blue"
          onClick={() => history.push(history.push(`/formularios/${formId}/dimensoes/${dimId}/indicadores`))}
        >
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
                  <span title={findDimensionName(dimensions, dimId)}>
                    {formatBigText(findDimensionName(dimensions, dimId), 20)}
                  </span>
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>
                  <span title={findIndicatorName(indicators, indId)}>
                    {formatBigText(findIndicatorName(indicators, indId), 20)}
                  </span>
                </Breadcrumb.Section>
                <Breadcrumb.Divider />

                <Breadcrumb.Section>
                  <span title={criterion ? formatBigText(criterion.titulo, 20) : 'Critérios'}>
                    {criterion ? formatBigText(criterion.titulo, 20) : 'Critérios'}
                  </span>
                </Breadcrumb.Section>
              </Breadcrumb>
            </React.Fragment>
          </Modal.Header>
          <Modal.Content>
            <FormInstitution.CriterionForm
              handleModal={handleModalForm}
              handleSideBar={handleSideBar}
              indicatorId={indId}
              criterion={criterion}
              updateCriteria={() => updateCriteria(indId, setLoading, setCriteria)}
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
          <Modal.Header>Você deseja mesmo excluir este critério?</Modal.Header>
          <Modal.Actions>
            <Button primary onClick={handleDeleteCriterion}>
              Sim
            </Button>
            <Button
              primary
              floated="left"
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
