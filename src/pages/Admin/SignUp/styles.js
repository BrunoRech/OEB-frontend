import styled from 'styled-components';
import { Form, Button} from 'semantic-ui-react';

export const PasswordForm = styled(Form)`
  margin: 0 15px;
  display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 15px;
`;

export const Container = styled.div`
  padding: 30px;
`;

export const CustomButton = styled(Button)`
  width: 150px;
`;

export const TabContainer = styled.div`
   margin-top: 20px;
`;

