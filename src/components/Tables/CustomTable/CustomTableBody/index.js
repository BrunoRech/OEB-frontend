import React from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';
import { TableCell, LoadingMessage } from './styles';

const CustomTableBody = ({ data, columns, loading }) => {
  const renderCell = (datum, column) => {
    return column.content ? column.content(datum) : _.get(datum, column.path);
  };

  const createKey = (datum, column, index) => {
    return datum._id + (column.path || column.key || column.label) + index;
  };

  return loading ? (
    <Table.Body>
      <Table.Row textAlign="center">
        <LoadingMessage textAlign="center" colSpan={columns.length}>
          Carregando, aguarde...
        </LoadingMessage>
      </Table.Row>
    </Table.Body>
  ) : (
    <Table.Body>
      {data &&
        data.map((datum, index) => (
          <Table.Row key={createKey(datum, index, index)}>
            {columns.map(column => (
              <TableCell
              width={column.width || 1}
                key={createKey(datum, column, index)}
                textAlign={column.textAlign ? column.textAlign : 'center'}
              >
                {renderCell(datum, column)}
              </TableCell>
            ))}
          </Table.Row>
        ))}
    </Table.Body>
  );
};

export default CustomTableBody;
