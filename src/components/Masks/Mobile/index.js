import React from 'react';
import { Form } from 'semantic-ui-react';

export default ({ onChange, label, name, value, width }) => {
  let formattedValue = '';
  if (value) {
    formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 11)
      formattedValue = formattedValue.padEnd(11, '');
    if (formattedValue.length > 11) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{4})(\d)/g, '($1) $2-$3');

    } else if (formattedValue.length > 6) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{5})(\d)/g, '($1) $2-$3');
    } else if (formattedValue.length > 2) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d)/g, '($1) $2');
    }
  }

  return <Form.Input fluid onChange={onChange} name={name} label={label} width={width} value={formattedValue} />;
};
