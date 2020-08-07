import styled from 'styled-components';
import { Modal as modal, Button as button, Form } from 'semantic-ui-react';
import { CustomTable as customTable } from '../../../components/Tables';

export const CustomTable = styled(customTable)`
  margin-top: 40px;
`;

export const ButtonContainer = styled.div`
  display: inline-flex;
`;

export const HeaderButtonContainer = styled.div`
  margin-top: 20px;
  display: inline-block;
  width: 100%;
`;

export const Modal = styled(modal)`
  padding: 15px;
`;

export const Button = styled(button)`
  min-width: 100px;
`;

export const Select = styled(Form.Select)`
  width: 100%;
`;
