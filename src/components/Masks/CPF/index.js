import React from 'react';
import { Form } from 'semantic-ui-react';

export default ({ onChange, label, name, value, width, placeholder}) => {
  let formattedValue = '';
  if (value) {
    formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 11) {
      formattedValue = formattedValue.substring(0, 11);
    }

    if (formattedValue.length > 9) {
      formattedValue = formattedValue.replace(/^(\d{3})(\d{3})(\d{3})(\d)/g, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      formattedValue = formattedValue.replace(/^(\d{3})(\d{3})(\d)/g, '$1.$2.$3');
    } else if (value.length > 3) {
      formattedValue = formattedValue.replace(/^(\d{3})(\d)/g, '$1.$2');
    }
  }
  return <Form.Input fluid  placeholder={placeholder} onChange={onChange} name={name} label={label} width={width} value={formattedValue} />;
};
