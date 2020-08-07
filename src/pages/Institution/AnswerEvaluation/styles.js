import styled from 'styled-components';
import { Checkbox as checkbox, Modal } from 'semantic-ui-react';

export const Checkbox = styled(checkbox)`
  display: block !important;
  margin-top: 5px;
`;

export const FormContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const CriteriaContainer = styled.div`
  margin-top: 30px;
  padding: 10px;
`;

export const Label = styled.p`
  color: ${props=> props.color ? props.color : '#000'};
  text-align: center;
  font-weight: bold;
`;

export const PostButtonContainer = styled.div`
  height: 30px;
`;

export const ModalHeader = styled(Modal.Header)`
  text-align: center;
`;

export const FinishButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
