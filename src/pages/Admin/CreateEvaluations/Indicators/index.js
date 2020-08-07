import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Icon, Button as ActionButton, Form, Breadcrumb } from 'semantic-ui-react';
import { Modal, ButtonContainer, CustomTable, HeaderButtonContainer, Button, Select } from '../styles';
import { FormInstitutionEvaluation as FormInstitution } from '../../../../components/Forms';
import api from '../../../../services/api';
import { formatBigText } from '../../../../utils';
import { Dashboard } from '../../../../components/Layout';
import {
  updateIndicators,
  fetchForms,
  findFormSituation,
  fetchDimensions,
  findDimensionName,
  findFormName
} from '../FormUtils';

export default ({ history, match }) => {
  const [formId, setFormId] = useState(match.params.formId);
  const [dimId, setDimId] = useState(match.params.dimId);
  const [loading, setLoading] = useState(false);
  const [actionsDisabled, setActions] = useState(true);
  const [showSidebar, handleSideBar] = useState(true);
  const [openModalForm, handleModalForm] = useState(false);
  const [openDeletionModal, handleDeletionModal] = useState(false);
  const [indicator, setIndicator] = useState(null);
  const [indicators, setIndicators] = useState([]);
  const [forms, setForms] = useState([]);
  const [dimensions, setDimensions] = useState([]);

  useEffect(() => {
    if (showSidebar) {
      updateIndicators(dimId, setLoading, setIndicators);
      fetchForms(setLoading, setForms);
    }
  }, [dimId, setLoading, setIndicators, setForms, showSidebar]);

  useEffect(() => {
    fetchDimensions(formId, setLoading, setDimensions);
  }, [setLoading, formId, setDimensions]);

  useEffect(() => {
    findFormSituation(forms, formId, setActions);
  }, [formId, forms, setActions]);

  const TABLE_COLUMNS = [
    {
      width: 5,
      path: 'titulo',
      label: 'Nome'
    },
    {
      label: 'Ações',
      content: indicator => (
        <ButtonContainer>
          <ActionButton
            title="Critérios"
            inverted
            color="green"
            onClick={() =>
              history.push(`/formularios/${formId}/dimensoes/${dimId}/indicadores/${indicator._id}/criterios`)
            }
            icon={<Icon name="clipboard outline" size="large" />}
          />
          <ActionButton
            title="Descrições"
            inverted
            color="violet"
            onClick={() =>
              history.push(`/formularios/${formId}/dimensoes/${dimId}/indicadores/${indicator._id}/descritores`)
            }
            icon={<Icon name="clipboard outline" size="large" />}
          />
          {!actionsDisabled && (
            <>
              <ActionButton
                title="Editar"
                inverted
                color="orange"
                onClick={() => {
                  setIndicator(indicator);
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
                  setIndicator(indicator);
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

  const handleDeleteIndicator = async () => {
    try {
      await api.delete(`/indicators/${indicator._id}`);
      toast.success('Indicador excluído com sucesso!');
      handleDeletionModal(false);
      handleSideBar(true);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  return (
    <>
      <Dashboard title="Indicadores" showSideBar={showSidebar} adm>
        <Form loading={loading}>
          <Form.Group>
            <Select
              label="Avaliação"
              options={forms}
              value={formId}
              onChange={(event, { value }) => {
                setFormId(value);
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
                updateIndicators(value, setLoading, setIndicators);
              }}
            />
          </Form.Group>
        </Form>
        <HeaderButtonContainer>
          <Button
            primary
            floated="right"
            onClick={() => updateIndicators(dimId, setLoading, setIndicators)}
            disabled={loading}
          >
            Atualizar
          </Button>
          {!actionsDisabled && (
            <Button
              color="green"
              onClick={() => {
                setIndicator(null);
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
          data={indicators}
          columns={TABLE_COLUMNS}
          loading={loading}
          notFoundMessage="Nenhum indicador encontrado"
        />
        <Button color="blue" onClick={() => history.push(`/formularios/${formId}/dimensoes`)}>
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
                  <span title={indicator ? formatBigText(indicator.titulo, 20) : 'Indicadores'}>
                    {indicator ? formatBigText(indicator.titulo, 20) : 'Indicadores'}
                  </span>
                </Breadcrumb.Section>
              </Breadcrumb>
            </React.Fragment>
          </Modal.Header>
          <Modal.Content>
            <FormInstitution.IndicatorForm
              handleModal={handleModalForm}
              handleSideBar={handleSideBar}
              dimensionId={dimId}
              indicator={indicator}
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
          <Modal.Header>Você deseja mesmo excluir este indicador?</Modal.Header>
          <Modal.Actions>
            <Button primary onClick={handleDeleteIndicator}>
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
