import styled from 'styled-components';
import { List, Button } from 'semantic-ui-react';

export const ListItem = styled(List.Item)`
  width: 100%;
  padding: 15px !important;
  background-color: ${props => (props.isseen ? '#ccc' : '#fff')};
  font-weight: ${props => (props.isseen ? 100 : 'bold')};
  :hover {
    background-color: #cfffcc;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: transparent !important;
  :hover {
    cursor: pointer;
  }
`;

export const ItemHeader = styled(List.Header)`
  font-weight: inherit !important;
  :hover {
    cursor: pointer;
    font-weight: bold !important;
  }
`;

export const NotificationText = styled.span`
  font-size: 16px;
`;

export const NotificationContainer = styled.div`
  margin-bottom: 15px;
  border: 1px solid rgba(34, 36, 38, 0.1);
  padding: 10px;
`;

export const NotificationContentHeader = styled.h4`
  text-align: center;
`;
