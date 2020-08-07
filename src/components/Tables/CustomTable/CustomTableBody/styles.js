import styled from 'styled-components';
import { Table } from 'semantic-ui-react'

export const LoadingMessage = styled.td`
  font-weight: bold;
  font-size: 15px;
`;

export const TableCell = styled(Table.Cell)`
  div {
    margin: 0 !important;
  }
`;
