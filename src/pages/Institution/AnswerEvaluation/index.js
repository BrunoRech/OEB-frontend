import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';
import { Dashboard } from '../../../components/Layout';
import { CustomTable } from '../../../components/Tables';
import {
  FormContainer,
  CriteriaContainer,
  Label,
  Checkbox,
  PostButtonContainer,
  ModalHeader,
  FinishButtonContainer
} from './styles';
import api from '../../../services/api';

export default ({ history, match }) => {
  const { id: formId } = match.params;
  const [criteria, setCriteria] = useState([]);
  const [selectedDimension, selectDimension] = useState({ dimensaoExistente: {} });
  const [avaliacao, setAvaliacao] = useState({ formulario: {}, respondido: false });
  const [selectedIndicator, selectIndicator] = useState({ indicadorExistente: {} });
  const [selectOptions, setSelectOptions] = useState([]);
  const [openCriteriaModal, handleCriteriaModal] = useState(false);
  const [openReportModal, handleReportModal] = useState(false);
  const [openLegalRequirementModal, handleLegalRequirementModal] = useState(false);
  const [openFinalReportModal, handleFinalReportModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { _id: indicadorId } = selectedIndicator.indicadorExistente;
    const fetchCriteria = async () => {
      const indicador = selectedDimension.indicadores.find(
        ({ indicadorExistente }) => indicadorExistente._id === indicadorId
      );
      setCriteria(
        indicador?.respostasCriterios.map(({ atende, criterioExistente }) => ({
          ...criterioExistente,
          atende: atende ? atende : 0
        }))
      );
    };
    indicadorId && selectedDimension.indicadores && fetchCriteria();
  }, [selectedIndicator, formId, selectedDimension.indicadores]);

  useEffect(() => {
    const fetchForm = async () => {
      setLoading(true);
      const { data } = await api.get(`/self-assessment-response/${formId}`);
      setAvaliacao(data);
      setLoading(false);
    };

    !openCriteriaModal && !openReportModal && !openFinalReportModal && !avaliacao.respondido && fetchForm();
  }, [openCriteriaModal, formId, openReportModal, openFinalReportModal, avaliacao.respondido]);

  const updateSelectOptions = indicators => {
    setSelectOptions(
      indicators.map(indicator => {
        const { indicadorExistente } = indicator;
        return {
          key: indicadorExistente._id,
          text: indicadorExistente.titulo,
          value: indicadorExistente._id,
          indicator
        };
      })
    );
  };

  const handleSave = async (index, indicatorId) => {
    const formattedCriteria = criteria.map(criterion => {
      return {
        criterio: criterion._id,
        atende: criterion.atende
      };
    });

    try {
      setLoading(true);
      await api.post(`/self-assessment-response/${indicatorId}`, {
        criterios: formattedCriteria
      });
      toast.success(`Critérios respondidos com sucesso!`);
      if (index + 1 === selectOptions.length) {
        handleCriteriaModal(false);
      } else {
        const { indicator } = selectOptions[index + 1];
        selectIndicator(indicator);
      }
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
    setLoading(false);
  };

  const handleSendReport = async () => {
    try {
      const { _id, titulo } = selectedDimension.dimensaoExistente;
      const { relatoGlobal } = selectedDimension;
      setLoading(true);
      await api.post(`/evaluate-dimension/${_id}`, { relatoGlobal });
      toast.success(`Relato global da dimensão ${titulo} avaliado com sucesso`);
      handleReportModal(false);
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
    setLoading(false);
  };

  const handleSendFinalReport = async () => {
    try {
      const { formulario, relatoFinal } = avaliacao;
      setLoading(true);
      await api.post(`/send-self-assessment/${formulario._id}`, { relatoFinal });
      toast.success(`Formulario ${formulario.titulo} respondido com sucesso!`);
      handleFinalReportModal(false);
      setLoading(false);
      history.push('/avaliacoes');
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
      setLoading(false);
    }
  };

  const handleSendLegalRequirements = async () => {
    try {
      const { formulario, requisitosLegais } = avaliacao;
      await api.post(`/legal-requirements-response/${formulario._id}`, {
        requisitos: requisitosLegais?.map(({ atende, requisitoExistente }) => ({
          requisito: requisitoExistente._id,
          atende: atende ? atende : 0
        }))
      });
      toast.success(`Requisitos legais e normativos respondidos com sucesso!`);
      handleLegalRequirementModal(false);
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  const COLLUMNS = [
    {
      label: 'Situação',
      content: ({ situacao }) => {
        if (situacao === 2) {
          return <Icon size="big" color="green" title="Avaliação concluída" name="checkmark" />;
        }
        if (situacao === 1) {
          return <Icon size="big" color="orange" title="Avaliação pendente" name="exclamation" />;
        }
        return <Icon size="big" color="red" title="Avaliação não iniciada" name="close" />;
      }
    },
    {
      path: 'dimensaoExistente.titulo',
      label: 'Dimensão',
      width: 4
    },
    {
      path: 'indicadoresAvaliados',
      label: 'Indicadores Avaliados'
    },
    {
      path: 'indicadoresTotais',
      label: 'Total de Indicadores'
    },
    {
      path: 'criteriosAvaliados',
      label: 'Critérios Avaliados'
    },
    {
      path: 'criteriosAtendidos',
      label: 'Critérios Atendidos'
    },
    {
      path: 'criteriosTotais',
      label: 'Total de Critérios'
    },
    {
      label: 'Ações',
      content: dimension => (
        <>
          <Button
            color="green"
            inverted
            size="big"
            title="Indicadores"
            icon={<Icon name={!avaliacao.respondido ? 'pencil' : 'eye'} />}
            onClick={() => {
              selectDimension(dimension);
              updateSelectOptions(dimension.indicadores);
              handleCriteriaModal(true);
              selectIndicator(dimension.indicadores[0]);
            }}
          />
          <Button
            color="violet"
            inverted
            size="big"
            title="Relato global"
            icon={<Icon name={!avaliacao.respondido ? 'clipboard' : 'eye'} />}
            onClick={() => {
              selectDimension(dimension);
              handleReportModal(true);
            }}
          />
        </>
      )
    }
  ];

  return (
    <>
      <Dashboard
        showSideBar={!(openCriteriaModal || openReportModal || openFinalReportModal || openLegalRequirementModal)}
        title={avaliacao.formulario.titulo}
      >
        <Button primary disabled={loading} onClick={() => handleLegalRequirementModal(true)} floated="right">
          Req. Legais/Normativos
        </Button>
        <Button primary onClick={() => history.push('/avaliacoes')} disabled={loading}>
          Voltar
        </Button>
        <CustomTable data={avaliacao.dimensoes} columns={COLLUMNS} loading={loading} />
        <Label>
          Para finalizar a avaliação clique no botão abaixo (Não será mais possível alterar qualquer critério)
        </Label>
        <FinishButtonContainer>
          <Button primary disabled={loading} onClick={() => handleFinalReportModal(true)}>
            Considerações Finais
          </Button>
        </FinishButtonContainer>
      </Dashboard>

      <Modal size="small" open={openFinalReportModal}>
        <ModalHeader>{avaliacao.formulario.titulo}</ModalHeader>
        <Modal.Content>
          <Form loading={loading}>
            {!avaliacao.respondido && (
              <Label color="red">Não será mais possível editar as respostas após este envio</Label>
            )}
            <Form.TextArea
              label="Relato final da avaliação"
              rows={5}
              value={avaliacao.relatoFinal}
              onChange={({ target }) => {
                !avaliacao.respondido && setAvaliacao({ ...avaliacao, relatoFinal: target.value });
              }}
            />
            {!avaliacao.respondido && (
              <PostButtonContainer>
                <Form.Button
                  primary
                  onClick={handleSendFinalReport}
                  floated="right"
                  title="Enviar as respostas do formulário para o conselho"
                >
                  Enviar relatório final
                </Form.Button>
              </PostButtonContainer>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            disabled={loading}
            onClick={() => {
              handleFinalReportModal(false);
            }}
          >
            Sair
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal size="small" open={openReportModal}>
        <ModalHeader>{avaliacao.formulario.titulo}</ModalHeader>
        <Modal.Content>
          <Form loading={loading}>
            <Form.TextArea
              label={`Relato global da dimensão: ${selectedDimension.dimensaoExistente.titulo}`}
              rows={5}
              value={selectedDimension.relatoGlobal}
              onChange={({ target }) => {
                !avaliacao.respondido && selectDimension({ ...selectedDimension, relatoGlobal: target.value });
              }}
            />
            {!avaliacao.respondido && (
              <PostButtonContainer>
                <Form.Button
                  primary
                  onClick={handleSendReport}
                  floated="right"
                  title="Enviar o relato global para a avaliação"
                >
                  Enviar relato
                </Form.Button>
              </PostButtonContainer>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            disabled={loading}
            onClick={() => {
              handleReportModal(false);
            }}
          >
            Sair
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal size="small" open={openCriteriaModal}>
        <ModalHeader>{avaliacao.formulario.titulo}</ModalHeader>
        <Modal.Content>
          <Form loading={loading}>
            <Label>Dimensão: {selectedDimension.dimensaoExistente.titulo}</Label>
            <Label>Indicador: {selectedIndicator.indicadorExistente.titulo}</Label>

            <CriteriaContainer>
              {criteria?.map(criterion => (
                <Checkbox
                  readOnly={avaliacao.respondido}
                  defaultChecked={criterion.atende === 1}
                  label={criterion.titulo}
                  key={criterion._id}
                  onClick={() => {
                    criterion.atende = criterion.atende === 1 ? 0 : 1;
                  }}
                />
              ))}
            </CriteriaContainer>
            <FormContainer>
              <Form.Select
                label="Selecionar outro indicador"
                options={selectOptions}
                value={selectedIndicator.indicadorExistente._id}
                onChange={(event, { value, options }) => {
                  const { indicator } = options.find(opt => opt.value === value);
                  selectIndicator(indicator);
                }}
              />
              {!avaliacao.respondido && (
                <Form.Button
                  label={`(${1 +
                    selectOptions.findIndex(opt => opt.value === selectedIndicator.indicadorExistente._id)} de ${
                    selectOptions.length
                  })`}
                  primary
                  title="Salvar as respostas do indicador atual e exibir o próximo"
                  onClick={async () =>
                    await handleSave(
                      selectOptions.findIndex(opt => opt.value === selectedIndicator.indicadorExistente._id),
                      selectedIndicator.indicadorExistente._id
                    )
                  }
                >
                  Salvar e avançar
                </Form.Button>
              )}
            </FormContainer>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            primary
            disabled={loading}
            onClick={() => {
              handleCriteriaModal(false);
            }}
          >
            Sair
          </Button>
        </Modal.Actions>
      </Modal>

      <Modal size="small" open={openLegalRequirementModal}>
        <ModalHeader>{avaliacao.formulario.titulo}</ModalHeader>
        <Modal.Content>
          <Label>Requisitos Legais e Normativos</Label>
          {avaliacao?.requisitosLegais?.map(req => (
            <Checkbox
              readOnly={avaliacao.respondido}
              defaultChecked={req.atende === 1}
              label={req.requisitoExistente.titulo}
              key={req._id}
              onClick={() => {
                req.atende = req.atende === 1 ? 0 : 1;
              }}
            />
          ))}
          <PostButtonContainer>
            <Button primary onClick={handleSendLegalRequirements} floated="right">
              Salvar
            </Button>
          </PostButtonContainer>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => handleLegalRequirementModal(false)}>
            Sair
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
