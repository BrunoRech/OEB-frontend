import React from 'react';
import { Form } from 'semantic-ui-react';

export default ({ onChange, label, name, value, width }) => {
  let formattedValue = '';
  if (value) {
    formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 8) {
      formattedValue = formattedValue.substring(0, 8);
    }

    if (formattedValue.length > 5) {
      formattedValue = formattedValue.replace(/^(\d{5})(\d)/g, '$1-$2');
    }
  }
  return <Form.Input fluid onChange={onChange} width={width} name={name} label={label} value={formattedValue} />;
};
