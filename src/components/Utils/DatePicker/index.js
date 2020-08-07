import React from 'react';
import DatePicker from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';
import 'react-datepicker/dist/react-datepicker.css';

const Datepicker = ({ selected, handleChange, value, withPortal, id }) => {

  return (
    <DatePicker
      selected={selected}
      onChange={handleChange}
      value={value}
      locale={ptBr}
      dateFormat="dd/MM/yyyy"
      withPortal={withPortal}
      id={id}
      timeIntervals={15}
    />
  );

};

export default Datepicker;
