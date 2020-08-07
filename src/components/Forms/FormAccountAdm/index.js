import React from 'react';
import { Button, Form, Divider } from 'semantic-ui-react';
import Telephone from '../../Masks/Telephone';
import CPF from '../../Masks/CPF';

export default ({ setPassForm, loading, handleFormSubmit, handleInputChange, values, renderButtonUpdate }) => {
  return (
    <Form
      className="form-internal"
      loading={!loading ? false : loading}
      onSubmit={!handleFormSubmit ? null : handleFormSubmit}
    >
      <Form.Group widths="equal">
        <CPF onChange={handleInputChange} type="cpf" name="cpf" label="CPF" value={values.cpf ? values.cpf : ''} />
        <Form.Input onChange={handleInputChange} name="nome" label="Nome" value={values.nome ? values.nome : ''} />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          onChange={handleInputChange}
          type="email"
          name="email"
          label="E-mail"
          value={values.email ? values.email : ''}
        />
        <Telephone
          onChange={handleInputChange}
          name="telefone"
          label="Telefone Fixo"
          value={values.telefone ? values.telefone : ''}
        />
      </Form.Group>

      <Divider />

      {renderButtonUpdate && (
        <>
          <Button primary floated="right" type="submit" disabled={loading}>
            Salvar Alterações
          </Button>
          <Button primary floated="right" disabled={loading} onClick={() => setPassForm(true)}>
            Alterar Senha
          </Button>
        </>
      )}
    </Form>
  );
};
