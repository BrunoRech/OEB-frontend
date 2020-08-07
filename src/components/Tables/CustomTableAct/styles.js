import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

const ButtonContainer = styled.div`
text-align:right;
 margin-top:20px;
`;

const TableHeaderCell = styled(Table.HeaderCell)`
 text-transform:capitalize;
`;

const ImageButton = styled.button`
background:transparent;
padding:10px;
border: 0;
cursor: pointer;
`;

export { ButtonContainer, TableHeaderCell, ImageButton };
