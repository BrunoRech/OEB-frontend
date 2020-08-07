import React from 'react';
import { Table } from 'semantic-ui-react';

const CustomTablePole = ({ data }) => {
  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Endereço</Table.HeaderCell>
          <Table.Cell>{data.endereco}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Município</Table.HeaderCell>
          <Table.Cell>{data.municipio.nome}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Número</Table.HeaderCell>
          <Table.Cell>{data.numero}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign="center">Telefone</Table.HeaderCell>
          <Table.Cell>{data.telefoneFixo}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell textAlign="center">E-mail</Table.HeaderCell>
          <Table.Cell>{data.emailResponsavel}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default CustomTablePole;
