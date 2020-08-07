import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import Telephone from '../../Masks/Telephone';
import CPF from '../../Masks/CPF';

export default ({ loading, handleFormSubmit, handleInputChange, values }) => (
  <Form className="form-internal" loading={loading} onSubmit={handleFormSubmit}>
    <Form.Group widths="equal">
      <CPF disabled onChange={handleInputChange} name="cpf" label="CPF" value={values.cpf ? values.cpf : ''} />

      <Form.Input
        fluid
        name="nome"
        onChange={handleInputChange}
        label="Nome completo"
        value={values.nome ? values.nome : ''}
      />
      <Form.Input
        fluid
        onChange={handleInputChange}
        name="email"
        label="E-mail"
        value={values.email ? values.email : ''}
      />
    </Form.Group>
    <Form.Group widths="equal">
      <Telephone
        onChange={handleInputChange}
        name="telefone"
        label="Telefone"
        value={values.telefone ? values.telefone : ''}
      />
      <Form.Input
        fluid
        name="senha"
        onChange={handleInputChange}
        label="Senha"
        type="password"
        value={values.senha ? values.senha : ''}
      />
      <Form.Input
        fluid
        name="senhaComfirmada"
        onChange={handleInputChange}
        label="Confirmar senha"
        type="password"
        value={values.senhaComfirmada ? values.senhaComfirmada : ''}
      />
    </Form.Group>
    <Button primary type="submit" disabled={loading} content="Salvar" floated="right" loading={loading} />
  </Form>
);
