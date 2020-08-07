import styled from 'styled-components';
import { Form, Button as button } from 'semantic-ui-react';

export const Button = styled(button)`
  min-width:100px;
`;

export const Act = styled.div`
  margin: 40px 0;
  padding: 15px;
`;

export const File = styled(Form.Input)`
  max-width: 250px;

  & label {
    line-height: 1.21428571em;
    padding: 0.85em 1em;
    border: 1px solid rgba(34, 36, 38, 0.15);
    color: rgba(0, 0, 0, 0.87);
    border-radius: 0.28571429rem;
    font-size: 1em;
    background: #fff;
    box-shadow: 0 0 0 0 transparent inset;
    transition: color 0.1s ease, border-color 0.1s ease;
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    margin: 0;
    margin-top: 22px !important;
    outline: 0;
    -webkit-appearance: none;
    cursor: pointer;
  }

  & input[type='file'] {
    display: none;
  }
`;

export const CourseInput = styled(Form.Input)`
  min-width: 500px;
  max-width: 500px;
`;
