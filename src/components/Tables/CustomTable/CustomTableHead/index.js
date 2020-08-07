import React from 'react';
import { Table } from 'semantic-ui-react';

const CustomTableHead = ({ columns }) => {
  return (
    <Table.Header>
      <Table.Row>
        {columns.map(column => (
          <Table.HeaderCell key={column.path || column.label} textAlign="center">
            {column.label}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
  );
};
export default CustomTableHead;
