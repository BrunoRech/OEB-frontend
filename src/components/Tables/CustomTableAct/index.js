import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableRow, Button, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import isValid from 'date-fns/isValid';
import { parseISO } from 'date-fns/esm';
import ImageViewer from '../../Utils/ImageViewer';
import CustomTable from '../CustomTable';
import { TableHeaderCell, ButtonContainer, ImageButton } from './styles';

const CustomTableAct = ({ data, handleHideButton }) => {
  const [polesView, setPolesView] = useState(false);
  const [linkedPoles, setLinkedPoles] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [act, setAct] = useState(data);

  useEffect(() => {
    const formatData = () => {
      const { polosVinculados: poles } = data;
      if(poles){
        setLinkedPoles(poles.map(linkedPole => {
          if (isValid(parseISO(linkedPole.validadeAto))) {
            linkedPole.validadeAto = format(new Date(parseISO(linkedPole.validadeAto)), 'dd/MM/yyyy');
          }
          return linkedPole;
        }));
      }
      const { validadeCurriculo, validadeParecer, validadeTipoAto } = data;
      const auxAct = { ...data };
      if (validadeCurriculo) {
        auxAct.validadeCurriculo = format(new Date(validadeCurriculo), 'dd/MM/yyyy');
      }
      auxAct.validadeParecer = format(new Date(validadeParecer), 'dd/MM/yyyy');
      auxAct.validadeTipoAto = format(new Date(validadeTipoAto), 'dd/MM/yyyy');

      setAct(auxAct);
    };

    formatData();
  }, [data]);

  const handleSeeImage = id => {
    setImageId(id);
    if (!handleHideButton) {
      return;
    }
    if (id) {
      handleHideButton(true);
    } else {
      handleHideButton(false);
    }
  };

  const polesColumns = [
    {
      path: 'polo.numero',
      label: 'Número'
    },
    {
      path: 'polo.emailResponsavel',
      label: 'Email'
    },
    {
      path: 'polo.telefoneFixo',
      label: 'Telefone'
    },
    {
      path: 'polo.municipio.nome',
      label: 'Município'
    },
    {
      path: 'polo.endereco',
      label: 'Endereço'
    },
    {
      path: 'validadeAto',
      label: 'Validade'
    },
    {
      path: 'arquivo',
      label: 'Arquivo',
      content: ato => (
        <ImageButton onClick={() => handleSeeImage(ato.arquivoAto)}>
          <Icon name="file image" size="large" color="black" />
        </ImageButton>
      )
    }
  ];

  return imageId ? (
    <>
      <ImageViewer imageId={imageId} />
      <ButtonContainer>
        <Button
          inverted
          color="red"
          onClick={() => {
            handleSeeImage(null);
          }}
        >
          Fechar Imagem
        </Button>
      </ButtonContainer>
    </>
  ) : (
    <Table celled textAlign="center">
      <Table.Body>
        {act.etapasEnsino === 'Profissional' ? (
          <Table.Row>
            <TableHeaderCell>Curso</TableHeaderCell>
            <Table.Cell colSpan="3">{act.curso}</Table.Cell>
          </Table.Row>
        ) : (
          <Table.Row>
            <TableHeaderCell>Modalidade de Ensino</TableHeaderCell>
            <Table.Cell colSpan="3">{act.etapasEnsino}</Table.Cell>
          </Table.Row>
        )}
        <Table.Row>
          <TableHeaderCell>Tipo de Mediação</TableHeaderCell>
          <Table.Cell colSpan="3">{act.tipoMediacao}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <TableHeaderCell>{act.tipoAto}</TableHeaderCell>
          <Table.Cell colSpan="1">{act.numeroAto}</Table.Cell>
          <Table.Cell colSpan="1">Válido até {act.validadeTipoAto}</Table.Cell>
          <Table.Cell colSpan="1">
            <ImageButton onClick={() => handleSeeImage(act.arquivoAto)}>
              <Icon name="file image" size="large" color="black" />
            </ImageButton>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <TableHeaderCell>Parecer</TableHeaderCell>
          <Table.Cell>{act.parecer}</Table.Cell>
          <Table.Cell>Válido até {act.validadeParecer}</Table.Cell>
          <Table.Cell>
            <ImageButton onClick={() => handleSeeImage(act.arquivoParecer)}>
              <Icon name="file image" size="large" color="black" />
            </ImageButton>
          </Table.Cell>
        </Table.Row>
        {act.curriculo && (
          <Table.Row>
            <TableHeaderCell>Curriculo</TableHeaderCell>
            <Table.Cell>{act.curriculo}</Table.Cell>
            <Table.Cell>Válido até {act.validadeCurriculo}</Table.Cell>
            <Table.Cell>
              <ImageButton onClick={() => handleSeeImage(act.arquivoCurriculo)}>
                <Icon name="file image" size="large" color="black" />
              </ImageButton>
            </Table.Cell>
          </Table.Row>
        )}

        <TableRow>
          <TableHeaderCell rowSpan={linkedPoles.length ? linkedPoles.legth : 1}>Polos</TableHeaderCell>
          <TableCell colSpan="3">
            {polesView && <CustomTable data={linkedPoles} columns={polesColumns} />}
            {linkedPoles.length > 0 ? (
              <Button
                basic
                color="blue"
                onClick={() => {
                  setPolesView(!polesView);
                }}
              >
                Mostrar/Esconder Polos
              </Button>
            ) : (
              <p>Este ato não possui polos</p>
            )}
          </TableCell>
        </TableRow>
      </Table.Body>
    </Table>
  );
};
export default CustomTableAct;
