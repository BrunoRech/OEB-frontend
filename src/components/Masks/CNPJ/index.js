import React from 'react';
import { Form } from 'semantic-ui-react';

export default ({ onChange, label, name, value, placeholder, width, disabled }) => {
  let formattedValue = '';
  if (value) {
    formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 14) {
      formattedValue = formattedValue.substring(0, 14);
    }

    if (formattedValue.length > 12) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d)/g, '$1.$2.$3/$4-$5');
    } else if (value.length > 8) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d)/g, '$1.$2.$3/$4');
    } else if (value.length > 5) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d{3})(\d)/g, '$1.$2.$3');
    } else if (value.length > 2) {
      formattedValue = formattedValue.replace(/^(\d{2})(\d)/g, '$1.$2');
    }
  }

  return (
    <Form.Input
      fluid
      onChange={onChange}
      name={name}
      label={label}
      width={width}
      placeholder={placeholder}
      value={formattedValue}
      disabled={disabled}
    />
  );
};
