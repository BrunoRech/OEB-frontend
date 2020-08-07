import React, { useState, useEffect } from 'react';
import decode from 'jwt-decode';
import { Header, Icon, Modal, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { Dashboard } from '../../../components/Layout';
import { CustomTable, CustomTablePole } from '../../../components/Tables';
import api from '../../../services/api';
import { getToken } from '../../../services/auth';

const Poles = ({ history }) => {
  const [modalOpen, handleModal] = useState(false);
  const [openConfirmation, handleConfirmation] = useState(false);
  const [currentPole, setCurrentPole] = useState({});
  const [currentPoleModal, setCurrentPoleInModal] = useState(null);
  const [id, setId] = useState(0);
  const [poles, setPoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoles = async () => {
      try {
        if (id !== 0) {
          setLoading(true);
          const { data } = await api.get(`poles`);
          setPoles(data);
        }
      } catch (err) {
        const { error } = err.response.data;
        toast.error(error);
      }
      setLoading(false);
    };

    const tokenDecoded = decode(getToken());
    setId(tokenDecoded.id);
    fetchPoles();
  }, [id]);

  const handleChangeModal = auxPole => {
    setCurrentPoleInModal(auxPole);
    handleModal(true);
  };

  const handleRemovePole = async () => {
    try {
      closeConfirmation();
      setLoading(true);
      const { _id: poleId } = currentPole;
      await api.delete(`poles/${poleId}`);
      setPoles(poles.filter(pole => pole._id !== poleId));
      toast.success('Sucesso ao excluir polo.');
    } catch (err) {
      const { error } = err.response.data;
      toast.error(error);
    }
    setLoading(false);
  };

  const closeConfirmation = () => {
    setCurrentPole({});
    handleConfirmation(false);
  };

  const columns = [
    {
      path: 'endereco',
      label: 'Endereço'
    },
    {
      path: 'municipio.nome',
      label: 'Município'
    },
    {
      path: 'emailResponsavel',
      label: 'E-mail Responsável'
    },
    {
      label: 'Ações',
      content: data => (
        <>
          <Button
            color="blue"
            title="Visualizar"
            primary
            inverted
            icon={<Icon name="zoom" size="large" />}
            onClick={() => handleChangeModal(data)}
          />
          <Button
            color="orange"
            icon={<Icon name="pencil" size="large" />}
            inverted
            onClick={() => history.push(`/novo-polo/${data._id}`)}
          />
          <Button
            color="red"
            inverted
            onClick={() => {
              setCurrentPole(data);
              handleConfirmation(true);
            }}
            icon={<Icon name="trash" size="large" />}
          />
        </>
      )
    }
  ];

  return (
    <Dashboard title="Polos" showSideBar={!(modalOpen || openConfirmation)}>
      <Button onClick={() => history.push('/novo-polo')} color="green" disabled={loading}>
        Novo
      </Button>

      <CustomTable
        columns={columns}
        data={poles}
        notFoundMessage="Nenhum polo encontrado, você possui algum polo cadastrado?"
        loading={loading}
      />

      <Modal open={openConfirmation}>
        <Modal.Header>Excluir Polo</Modal.Header>
        <Modal.Content>Você tem certeza em excluir esse polo?</Modal.Content>
        <Modal.Actions>
          <>
            <Button color="green" inverted size="large" onClick={closeConfirmation}>
              Voltar
            </Button>
            <Button color="red" inverted size="large" onClick={handleRemovePole}>
              Excluir
            </Button>
          </>
        </Modal.Actions>
      </Modal>

      <Modal open={modalOpen} onClose={() => handleModal(false)} size="small">
        <Header icon="browser" content="Informações do polo" />

        {currentPoleModal && (
          <Modal.Content>
            <CustomTablePole data={currentPoleModal} />
          </Modal.Content>
        )}

        <Modal.Actions>
          <Button color="red" onClick={() => handleModal(false)} inverted>
            <Icon name="arrow left" /> Voltar
          </Button>
        </Modal.Actions>
      </Modal>
    </Dashboard>
  );
};

export default Poles;
