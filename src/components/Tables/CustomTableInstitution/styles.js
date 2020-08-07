import styled from 'styled-components';
import { Grid, Checkbox, Button, TextArea as textArea } from 'semantic-ui-react';

export const Input = styled.input`
  text-align: center;
  width: 100%;
  border: 0;
  margin: 0;
  padding: 5px;
  :focus {
    outline: none;
  }
`;

export const Label = styled.span`
  font-weight: 500;
  font-size: 15px;
`;

export const TextArea = styled(textArea)`
  width: 100%;
`;

export const ColumnHeader = styled(Grid.Column)`
  font-weight: bold;
  font-size: 15px;
`;

export const CheckBoxContainer = styled.div`
  display: table-row;
  width: 100%;
`;
export const GridContainer = styled.div`
  padding: 10px;
  border: solid 1px rgba(34, 36, 38, 0.15);
  margin-top: 14px;
`;

export const CheckboxFilter = styled(Checkbox)`
  width: 100%;
  text-align: center;
`;

export const TransparentButton = styled(Button)`
  background-color: transparent !important;
`;
