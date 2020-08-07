import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button as button, Form as form } from 'semantic-ui-react';

export const Wrapper = styled.div`
  padding: 1.5rem;
`;

export const Form = styled(form)`
  height:150px;
`;

export const ForgotPasswordLink = styled(Link)`
  float: right;
  cursor: pointer;
`;

export const Button = styled(button)`
  width: 140px;
  height: 38px;
`;

export const LinkContainer = styled.div`
  height: 30px;
  margin-bottom: 10px;
  display: grid;
`;
