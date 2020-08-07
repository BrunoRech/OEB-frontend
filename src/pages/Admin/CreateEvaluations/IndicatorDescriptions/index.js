import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Icon, Button as ActionButton, Form, Breadcrumb } from 'semantic-ui-react';
import { Modal, ButtonContainer, CustomTable, HeaderButtonContainer, Button, Select } from '../styles';
import { FormInstitutionEvaluation as FormInstitution } from '../../../../components/Forms';
import api from '../../../../services/api';
import { formatBigText } from '../../../../utils';
import { Dashboard } from '../../../../components/Layout';
import {
  updateDescription,
  fetchDimensions,
  fetchForms,
  fetchIndicators,
  findDimensionName,
  findFormName,
  findIndicatorName,
  findFormSituation
} from '../FormUtils';

export default ({ history, match }) => {
  const [formId, setFormId] = useState(match.params.formId);
  const [dimId, setDimId] = useState(match.params.dimId);
  const [indId, setIndId] = useState(match.params.indId);
  const [actionsDisabled, setActions] = useState(true);
  const [openModalForm, handleModalForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSideBar, handleSideBar] = useState(true);
  const [openDeletionModal, handleDeletionModal] = useState(false);
  const [description, setDescription] = useState(null);
  const [descriptions, setDescriptions] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [forms, setForms] = useState([]);
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    if (showSideBar) {
      updateDescription(indId, setLoading, setDescriptions);
      fetchForms(setLoading, setForms);
    }
  }, [indId, setLoading, setDescriptions, setForms, showSideBar]);

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
      width: 3,
      path: 'descricao',
      label: 'Descrição'
    },
    {
      path: 'conceito',
      label: 'Conceito'
    },
    {
      path: 'valorMinimo',
      label: 'Valor Mínimo'
    },
    {
      path: 'valorMaximo',
      label: 'Valor Máximo'
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
            setDescription(criterion);
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
            setDescription(criterion);
            handleSideBar(false);
            handleDeletionModal(true);
          }}
          icon={<Icon name="trash" size="large" />}
        />
      </ButtonContainer>
    )
  };

  const handleDeleteDescription = async () => {
    try {
      await api.delete(`/indicators/${indId}/criteria-descriptors/${description._id}`);
      toast.success('Descrição excluída com sucesso!');
      handleDeletionModal(false);
      handleSideBar(true);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  return (
    <>
      <Dashboard showSideBar={showSideBar} adm title="Descritores">
        <Form loading={loading}>
          <Form.Group>
            <Select
              label="Avaliação"
              options={forms}
              value={formId}
              onChange={(event, { value }) => {
                setFormId(value);
                setDescriptions([]);
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
                setDescriptions([]);
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
              setDescriptions([]);
              updateDescription(value, setLoading, setDescriptions);
            }}
          />
        </Form>
        <HeaderButtonContainer>
          <Button
            primary
            floated="right"
            onClick={() => updateDescription(indId, setLoading, setDescriptions)}
            disabled={loading}
          >
            Atualizar
          </Button>
          {!actionsDisabled && (
            <Button
              color="green"
              onClick={() => {
                setDescription(null);
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
          data={descriptions}
          columns={actionsDisabled ? TABLE_COLUMNS : [...TABLE_COLUMNS, ACTION_COLUMN]}
          loading={loading}
          notFoundMessage="Nenhuma descrição encontrada"
        />
        <Button color="blue" onClick={() => history.push(`/formularios/${formId}/dimensoes/${dimId}/indicadores`)}>
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
                  <span title={description ? formatBigText(description.descricao, 20) : 'Descritores'}>
                    {description ? formatBigText(description.descricao, 20) : 'Descritores'}
                  </span>
                </Breadcrumb.Section>
              </Breadcrumb>
            </React.Fragment>
          </Modal.Header>
          <Modal.Content>
            <FormInstitution.DescriptionForm
              handleModal={handleModalForm}
              handleSideBar={handleSideBar}
              indicatorId={indId}
              description={description}
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
          <Modal.Header>Você deseja mesmo excluir este descritor?</Modal.Header>
          <Modal.Actions>
            <Button primary onClick={handleDeleteDescription}>
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
