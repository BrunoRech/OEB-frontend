import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

export const Container = styled.div`
  margin-top: ${props => (props.isAdmin ? '10px' : '80px')};
  width: ${props => !props.isAdmin && '1200px'};
  margin-left: ${props => !props.isAdmin && 'auto'};
  margin-right: ${props => !props.isAdmin && 'auto'};
`;

export const FormContainer = styled.div`
  display: ${props => !props.open && 'none'};
  margin-right: 10px;
`;
export const TableContainer = styled.div`
  width: inherit;
`;

export const FilterButton = styled(Button)`
  width: 100% !important;
`;

export const Label = styled.span`
  display: block;
  margin: 0 0 0.28571429rem 0;
  color: rgba(0, 0, 0, 0.87);
  font-size: 0.92857143em;
  font-weight: 700;
  text-transform: none;
`;

export const InlineContainer = styled.div`
  display: inline-flex;
  width: 100%;
  margin-top: 15px;
`;

export const PaginateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-top: 8px;
  bottom: 0;
  height: 80px;
  width: 100%;
`;
