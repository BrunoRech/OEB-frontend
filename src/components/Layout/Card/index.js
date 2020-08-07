import React from 'react';
import { CardContent, CardHeader, Card } from './styles';

export default ({ content, title }) => {
  return (
    <Card>
      <CardContent>
        <CardHeader>{title ? title() : ''}</CardHeader>
      </CardContent>

      <CardContent>{content ? content() : ''}</CardContent>
    </Card>
  );
};
