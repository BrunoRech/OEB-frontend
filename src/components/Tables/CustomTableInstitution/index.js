import React, { useState } from 'react';
import { Grid, Button, Icon, Modal, Tab } from 'semantic-ui-react';
import CustomTable from '../CustomTable';
import CustomTableAct from '../CustomTableAct';
import { ColumnHeader, TransparentButton, GridContainer, TextArea, Label } from './styles';

export default ({ isAdm, handleSideBar, acts, handleDisapprove, handleApprove, loading }) => {
  const [modalOpen, handleModal] = useState(false);
  const [openConfirmationModal, handleConfirmationModal] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [isApproving, handleApproving] = useState(false);
  const [selectedAct, setSelectedAct] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [comments, setComments] = useState('');

  const handleHideButton = option => {
    setHideButton(option);
  };

  const columns = [
    {
      width: 3,
      path: 'instituicao.nomeFantasia',
      label: 'Nome Fantasia'
    },
    {
      width: 3,
      path: 'instituicao.endereco',
      label: 'Endereco'
    },
    {
      width: 3,
      path: 'instituicao.municipio.nome',
      label: 'Municipio'
    },
    {
      width: 3,
      label: 'Etapas de Ensino',
      content: act => {
        return (
          <span>
            {act.etapasEnsino !== 'Profissional' ? <span>{act.etapasEnsino}</span> : <span>{act.curso}</span>}
          </span>
        );
      }
    },
    {
      width: isAdm ? 3 : 1,
      label: 'Ações',
      content: act => (
        <>
          <TransparentButton
            icon={<Icon name="zoom" size="big" />}
            disabled={loading}
            onClick={() => {
              handleSideBar && handleSideBar(false);
              setSelectedAct(act);
              handleModal(true);
            }}
          />
          {isAdm && (
            <>
              <TransparentButton
                icon={<Icon name="close" color="red" size="big" />}
                disabled={loading}
                onClick={() => {
                  handleSideBar(false);
                  handleApproving(false);
                  handleConfirmationModal(true);
                  setSelectedAct(act);
                }}
              />
              <TransparentButton
                disabled={loading}
                icon={<Icon name="checkmark" color="green" size="big" />}
                onClick={() => {
                  handleSideBar(false);
                  handleApproving(true);
                  handleConfirmationModal(true);
                  setSelectedAct(act);
                }}
              />
            </>
          )}
        </>
      )
    }
  ];

  const panes = [
    {
      menuItem: 'Ato',
      render: () => <CustomTableAct key={selectedAct._id} data={selectedAct} handleHideButton={handleHideButton} />
    },
    {
      menuItem: 'Instituição',
      render: () => (
        <GridContainer>
          <Grid columns={2}>
            <ColumnHeader>Razão Social</ColumnHeader>
            <Grid.Column>{selectedAct.instituicao.razaoSocial}</Grid.Column>
          </Grid>
          <Grid columns={2}>
            <ColumnHeader>Nome Fantasia</ColumnHeader>
            <Grid.Column>{selectedAct.instituicao.nomeFantasia}</Grid.Column>
          </Grid>
          <Grid columns={2}>
            <ColumnHeader>Endereço</ColumnHeader>
            <Grid.Column>{selectedAct.instituicao.endereco}</Grid.Column>
          </Grid>
          <Grid columns={2}>
            <ColumnHeader>Municipio</ColumnHeader>
            <Grid.Column>{selectedAct.instituicao.municipio.nome}</Grid.Column>
          </Grid>
          <Grid columns={2}>
            <ColumnHeader>CNPJ</ColumnHeader>
            <Grid.Column>{selectedAct.instituicao.cnpj}</Grid.Column>
          </Grid>
        </GridContainer>
      )
    }
  ];

  return (
    <>
      <CustomTable columns={columns} data={acts} notFoundMessage="Nenhuma instituição encontrada" loading={loading} />
      <Modal open={modalOpen} size="small">
        <Modal.Header>{tabIndex === 0 ? 'Detalhes sobre o Ato' : 'Detalhes sobre a Instituição'}</Modal.Header>
        <Modal.Content>
          <Tab panes={panes} onTabChange={(event, { activeIndex }) => setTabIndex(activeIndex)} />
        </Modal.Content>
        {!hideButton && (
          <Modal.Actions>
            <Button
              color="red"
              onClick={() => {
                handleSideBar && handleSideBar(true);
                handleModal(false);
              }}
              inverted
            >
              <Icon name="arrow left" /> Voltar
            </Button>
          </Modal.Actions>
        )}
      </Modal>

      <Modal open={openConfirmationModal}>
        <Modal.Header>{isApproving ? 'Aprovar' : 'Reprovar'} Ato</Modal.Header>
        <Modal.Content>
          {!isApproving ? (
            <TextArea rows="6" placeholder="Digite suas observações aqui" onChange={e => setComments(e.target.value)} />
          ) : (
            <Label>Você realmente quer aprovar este ato?</Label>
          )}
        </Modal.Content>
        <Modal.Actions>
          {isApproving ? (
            <Button
              disabled={loading}
              positive
              floated="right"
              icon="checkmark"
              labelPosition="right"
              content="Aprovar"
              onClick={async () => {
                await handleApprove(selectedAct);
                handleConfirmationModal(false);
                handleSideBar(true);
              }}
            />
          ) : (
            <Button
              disabled={loading}
              negative
              size="medium"
              floated="right"
              onClick={async () => {
                await handleDisapprove(comments, selectedAct);
                setComments('');
                handleConfirmationModal(false);
                handleSideBar(true);
              }}
            >
              Enviar Reprovação
            </Button>
          )}
          <Button
            color="red"
            onClick={() => {
              handleConfirmationModal(false);
              handleSideBar(true);
            }}
            inverted
            disabled={loading}
          >
            <Icon name="arrow left" /> Voltar
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
