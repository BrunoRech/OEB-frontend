import React, { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import { Header, Icon, Modal, Button } from 'semantic-ui-react';
import { CustomTable, CustomTableAct } from '../../../components/Tables';
import { Dashboard } from '../../../components/Layout';
import api from '../../../services/api';
import { getToken } from '../../../services/auth';

const LegalActs = ({ history }) => {
  const [modalOpen, handleModal] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [openConfirmation, handleConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentActInModal, setCurrentActInModal] = useState(null);
  const [id, setId] = useState(0);
  const [actSelected, setActSelected] = useState({});
  const [acts, setActs] = useState([]);

  useEffect(() => {
    const fetchActs = async () => {
      if (id !== 0) {
        setLoading(true);
        const reponse = await api.get(`/acts`);
        const { data } = reponse;
        setActs(data);
        setLoading(false);
      }
    };
    const tokenDecoded = decode(getToken());
    setId(tokenDecoded.id);
    fetchActs();
  }, [id]);

  const handleChangeModal = auxAct => {
    setCurrentActInModal(auxAct);
    handleModal(true);
  };

  async function handleRemoveAct() {
    closeConfirmation();
    const { _id: actId } = actSelected;
    setLoading(true);
    try {
      await api.delete(`acts/${actId}`);
      setActs(acts.filter(act => act._id !== actId));
      toast.success('Sucesso ao excluir o ato');
    } catch (err) {
      const { message } = err.response.data;
      toast.error(message);
    }
    return setLoading(false);
  }

  const handleHideButton = option => {
    setHideButton(option);
  };

  const closeConfirmation = () => {
    setActSelected({});
    handleConfirmation(false);
  };

  const columns = [
    {
      width: 1,
      path: 'isApproved',
      label: 'Status',
      content: ({ wasSeen, isApproved, preparadoParaAvaliacao }) => {
        if (!preparadoParaAvaliacao) {
          return <Icon name="exclamation" color="orange" size="big" title="Ato incompleto" />;
        }
        if (!wasSeen) {
          return <Icon name="time" color="grey" size="big" title="Em avaliação" />;
        }
        return (
          <>
            {isApproved ? (
              <Icon name="checkmark" color="green" size="big" title="Aprovado" />
            ) : (
              <Icon name="close" color="red" size="big" title="Reprovado" />
            )}
          </>
        );
      }
    },
    {
      width: 2,
      path: 'etapasEnsino',
      label: 'Modalidade de Ensino'
    },
    {
      width: 2,
      path: 'tipoMediacao',
      label: 'Tipo Mediação'
    },
    {
      width: 2,
      path: 'tipoAto',
      label: 'Tipo do Ato'
    },
    {
      width: 2,
      path: 'numeroAto',
      label: 'Número do Ato'
    },
    {
      width: 2,
      path: 'parecer',
      label: 'Parecer'
    },
    {
      width: 2,
      label: 'Ações',
      content: act => (
        <>
          <Button
            color="blue"
            title="Visualizar"
            primary
            inverted
            icon={<Icon name="zoom" size="large" />}
            onClick={() => handleChangeModal(act)}
          />
          <Button
            title="Editar"
            color="orange"
            inverted
            icon={<Icon name="pencil" size="large" />}
            onClick={() => history.push(`novo-ato/${act._id}`)}
          />

          <Button
            title="Excluir"
            color="red"
            inverted
            onClick={() => {
              setActSelected(act);
              handleConfirmation(true);
            }}
            icon={<Icon name="trash" size="large" />}
          />
        </>
      )
    }
  ];

  return (
    <Dashboard title="Atos Legais" showSideBar={!(modalOpen || openConfirmation)}>
      <Button onClick={() => history.push('/novo-ato')} color="green" disabled={loading}>
        Novo
      </Button>

      <CustomTable
        columns={columns}
        data={acts}
        notFoundMessage="Nenhum ato encontrado, você possui algum ato cadastrado?"
        loading={loading}
      />

      <Modal open={openConfirmation}>
        <Modal.Header>Excluir Ato</Modal.Header>
        <Modal.Content>Você tem certeza em excluir esse ato?</Modal.Content>
        <Modal.Actions>
          <>
            <Button color="green" inverted size="large" onClick={() => handleConfirmation(false)}>
              Voltar
            </Button>

            <Button color="red" inverted size="large" onClick={() => handleRemoveAct()}>
              Excluir
            </Button>
          </>
        </Modal.Actions>
      </Modal>

      <Modal open={modalOpen} onClose={() => handleModal(false)}>
        <Header icon="browser" content="Informações do ato" />

        {currentActInModal && (
          <Modal.Content>
            <CustomTableAct data={currentActInModal} path="/atos-legais" handleHideButton={handleHideButton} />
          </Modal.Content>
        )}

        {!hideButton && (
          <Modal.Actions>
            <Button color="red" onClick={() => handleModal(false)} inverted>
              <Icon name="arrow left" /> Voltar
            </Button>
          </Modal.Actions>
        )}
      </Modal>
    </Dashboard>
  );
};

export default LegalActs;
