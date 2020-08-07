import React from 'react';
import { Table } from 'semantic-ui-react';
import { NotFoundMessage } from './styles';
import CustomTableBody from './CustomTableBody';
import CustomTableHead from './CustomTableHead';

const CustomTable = ({ columns, data, notFoundMessage, title, loading }) => {

  return (
    <Table celled>
      {title && title !== '' && (
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">{title}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )}
      <CustomTableHead columns={columns} />
      {!loading && data && data.length === 0 ? (
        <Table.Body>
          <Table.Row textAlign="center">
            <NotFoundMessage textAlign="center" colSpan={columns.length}>
              {notFoundMessage}
            </NotFoundMessage>
          </Table.Row>
        </Table.Body>
      ) : (
        <CustomTableBody data={data} columns={columns} loading={loading} />
      )}
    </Table>
  );
};

export default CustomTable;
