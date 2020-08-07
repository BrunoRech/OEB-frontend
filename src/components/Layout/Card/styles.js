import styled from 'styled-components';
import { Card as SemanticCard } from 'semantic-ui-react';

const CardContent = styled(SemanticCard.Content)`
  padding: 0 !important;
`;

const CardHeader = styled(SemanticCard.Header)`
  padding: 15px;
`;

const Card = styled(SemanticCard)`
  display: table !important;
`;

export { CardHeader, CardContent, Card };
