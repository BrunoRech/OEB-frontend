import React from 'react';
import { Button, Form, Divider } from 'semantic-ui-react';
import Telephone from '../../Masks/Telephone';

export default ({ setPassForm, loading, handleFormSubmit, handleInputChange, values, renderButtonUpdate }) => {
  return (
    <Form className="form-internal" loading={loading} onSubmit={handleFormSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          onChange={handleInputChange}
          name="responsavelDados"
          label="Responsável pelos dados de verificação"
          value={values.responsavelDados ? values.responsavelDados : ''}
        />
        <Telephone
          onChange={handleInputChange}
          name="telefoneResponsavel"
          label="Telefone do responsável"
          value={values.telefoneResponsavel ? values.telefoneResponsavel : ''}
        />
        <Form.Input
          onChange={handleInputChange}
          type="email"
          name="emailResponsavel"
          label="E-mail do responsável"
          value={values.emailResponsavel ? values.emailResponsavel : ''}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          onChange={handleInputChange}
          name="secretario"
          label="Secretário(a) da mantida"
          value={values.secretario ? values.secretario : ''}
        />
        <Telephone
          onChange={handleInputChange}
          name="telefoneSecretario"
          label="Telefone do secretário"
          value={values.telefoneSecretario ? values.telefoneSecretario : ''}
        />
        <Form.Input
          onChange={handleInputChange}
          type="email"
          name="emailSecretario"
          label="E-mail do secretário"
          value={values.emailSecretario ? values.emailSecretario : ''}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          onChange={handleInputChange}
          name="diretor"
          label="Diretor(a) da mantida"
          value={values.diretor ? values.diretor : ''}
        />
        <Telephone
          onChange={handleInputChange}
          name="telefoneDiretor"
          label="Telefone do diretor"
          value={values.telefoneDiretor ? values.telefoneDiretor : ''}
        />
        <Form.Input
          onChange={handleInputChange}
          type="email"
          name="emailDiretor"
          label="E-mail do diretor"
          value={values.emailDiretor ? values.emailDiretor : ''}
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
