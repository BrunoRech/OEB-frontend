import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Icon, Button as ActionButton, Breadcrumb } from 'semantic-ui-react';
import TreeViewer from '../TreeViewer';
import { ButtonContainer, Modal, CustomTable, Button } from '../styles';
import { FormInstitutionEvaluation as Form } from '../../../../components/Forms';
import api from '../../../../services/api';
import { formatBigText } from '../../../../utils';
import { Dashboard } from '../../../../components/Layout';
import { updateForms } from '../FormUtils';

export default ({ history }) => {
  const [openModal, handleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModalForm, handleModalForm] = useState(false);
  const [showSideBar, handleSideBar] = useState(true);
  const [openDeletionModal, handleDeletionModal] = useState(false);
  const [openConfirmationModal, handleConfirmationModal] = useState(false);
  const [form, setForm] = useState({});
  const [forms, setForms] = useState([]);

  useEffect(() => {
    showSideBar && updateForms(setLoading, setForms);
  }, [setLoading, setForms, showSideBar]);

  const TABLE_COLUMNS = [
    {
      path: 'titulo',
      label: 'Nome',
      width: 3
    },
    {
      path: 'situacao',
      label: 'Situação',
      width: 1,
      content: form => {
        const { situacao } = form;
        if (situacao === '1') {
          return 'Aberto';
        }
        if (situacao === '2') {
          return 'Em Aplicação';
        }
        return 'Cancelada';
      }
    },
    {
      label: 'Ações',
      content: form => (
        <ButtonContainer>
          <ActionButton
            title="Visualizar"
            inverted
            color="blue"
            onClick={() => {
              setForm(form);
              handleModal(true);
              handleSideBar(false);
            }}
            icon={<Icon name="zoom" size="large" />}
          />
          <ActionButton
            title="Dimensões"
            inverted
            color="green"
            onClick={() => history.push(`/formularios/${form._id}/dimensoes`)}
            icon={<Icon name="clipboard outline" size="large" />}
          />
          <ActionButton
            title="Clonar formulário"
            color="violet"
            inverted
            onClick={() => {
              setForm({ _id: form._id, clone: true, titulo: '', anoAplicacao: '' });
              handleModalForm(true);
              handleSideBar(false);
            }}
            icon={<Icon name="copy" size="large" />}
          />
          <ActionButton
            title="Requisitos legais e normativos"
            inverted
            color="green"
            onClick={() => history.push(`/formularios/${form._id}/requisitos`)}
            icon={<Icon name="file alternate outline" size="large" />}
          />
          {!(form.situacao === '2') && (
            <>
              <ActionButton
                title="Editar"
                inverted
                color="orange"
                onClick={() => {
                  setForm(form);
                  handleModalForm(true);
                  handleSideBar(false);
                }}
                icon={<Icon name="pencil" size="large" />}
              />
              <ActionButton
                title="Ecluir"
                inverted
                color="red"
                onClick={() => {
                  setForm(form);
                  handleSideBar(false);
                  handleDeletionModal(true);
                }}
                icon={<Icon name="trash" size="large" />}
              />
              <ActionButton
                title="Enviar para avaliação"
                inverted
                color="violet"
                onClick={() => {
                  handleSideBar(false);
                  setForm(form);
                  handleConfirmationModal(true);
                }}
                icon={<Icon name="send" size="large" />}
              />
            </>
          )}
        </ButtonContainer>
      )
    }
  ];

  const handleDeleteForm = async () => {
    try {
      await api.delete(`/forms/${form._id}`);
      toast.success('Formulário excluído com sucesso!');
      handleDeletionModal(false);
      handleSideBar(true);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  const handleSendForm = async () => {
    try {
      await api.put(`/change-form-state/${form._id}`, {
        situacao: '2'
      });
      handleConfirmationModal(false);
      handleSideBar(true);
      toast.success('Formulário enviado para a avaliação com sucesso!');
      updateForms(setLoading, setForms);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  return (
    <>
      <Dashboard showSideBar={showSideBar} title="Formulários" adm>
        <Button primary floated="right" onClick={() => updateForms(setLoading, setForms)} disabled={loading}>
          Atualizar
        </Button>
        <Button
          color="green"
          onClick={() => {
            setForm(null);
            handleModalForm(true);
            handleSideBar(false);
          }}
          disabled={loading}
        >
          Novo
        </Button>
        <CustomTable data={forms} columns={TABLE_COLUMNS} loading={loading} />

        <Modal open={openModalForm}>
          <Modal.Header>
            <React.Fragment>
              <Breadcrumb size="huge">
                <Breadcrumb.Section>
                  {form?.clone ? (
                    <span title="Clonar formulário">Clonar formulário</span>
                  ) : (
                    <span title={form?.titulo ? form.titulo : 'Avaliações'}>
                      {form?.titulo ? formatBigText(form.titulo, 20) : 'Avaliações'}
                    </span>
                  )}
                </Breadcrumb.Section>
              </Breadcrumb>
            </React.Fragment>
          </Modal.Header>
          <Modal.Content>
            <Form.EvaluationForm handleModal={handleModalForm} handleSideBar={handleSideBar} form={form} />
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

        <Modal open={openModal}>
          <Modal.Header>Visualização da avaliação</Modal.Header>
          <Modal.Content>{<TreeViewer form={form} />}</Modal.Content>
          <Button
            primary
            onClick={() => {
              handleModal(false);
              handleSideBar(true);
            }}
          >
            Voltar
          </Button>
        </Modal>

        <Modal open={openDeletionModal} size="mini">
          <Modal.Header>Você deseja mesmo excluir este formulário?</Modal.Header>
          <Modal.Actions>
            <Button primary onClick={handleDeleteForm}>
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

        <Modal open={openConfirmationModal} size="small">
          <Modal.Header>Envio do formulario</Modal.Header>
          <Modal.Content>
            <p>
              A partir do momento que uma avaliação é enviada, ela estará disponível para que todas as instituições a
              respondam.
            </p>
            <p>Também NÃO será mais possível realizar alterações. Deseja confirmar envio?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={handleSendForm} floated="right">
              Enviar
            </Button>
            <Button
              floated="left"
              primary
              onClick={() => {
                handleConfirmationModal(false);
                handleSideBar(true);
              }}
            >
              Voltar
            </Button>
          </Modal.Actions>
        </Modal>
      </Dashboard>
    </>
  );
};
