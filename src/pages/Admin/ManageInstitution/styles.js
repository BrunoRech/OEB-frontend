import styled from 'styled-components';
import { Button as button } from 'semantic-ui-react';

export const CustomButton = styled(button)`
  width: 100px;
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

export const FilterButton = styled(button)`
  width: 100% !important;
`;

export const Container = styled.div`
  margin-top: 10px;
`;

export const InlineContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
`;

export const FormContainer = styled.div`
  display: ${props => !props.open && 'none'};
  margin-right: 10px;
`;
