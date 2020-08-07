import React, { useState } from 'react';
import { Tab, Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import { Pane, Dashboard } from '../../../components/Layout';
import { FormMaintenedInstitution } from '../../../components/Forms';
import { FormAccount } from '../../../components/Forms';
import { PasswordForm, CustomButton, TabContainer } from './styles';
import { removeSpecialChars } from '../../../utils';
import useForm from '../../../hooks/useForm';

const initialState = {
  cep: '',
  cnpj: '',
  cnpjMantenedora: '',
  dependenciaAdministrativa: '',
  diretor: '',
  email: '',
  emailDiretor: '',
  emailResponsavel: '',
  emailSecretario: '',
  endereco: '',
  municipio: '',
  nomeFantasia: '',
  numero: '',
  razaoSocial: '',
  razaoSocialMantenedora: '',
  responsavelDados: '',
  secretario: '',
  senha: '',
  site: '',
  telefoneCelular: '',
  telefoneDiretor: '',
  telefoneFixo: '',
  telefoneResponsavel: '',
  telefoneSecretario: ''
};

const SignUp = ({ history, match }) => {
  const [activeindex, setIndex] = useState(0);
  const institutionId = match.params.id;

  const callbackSubmit = async () => {
    const {
      cnpjMantenedora,
      cnpj,
      cep,
      telefoneFixo,
      telefoneCelular,
      telefoneResponsavel,
      telefoneDiretor,
      telefoneSecretario
    } = data;

    const auxInstitution = {
      ...data,
      cnpjMantenedora: removeSpecialChars(cnpjMantenedora),
      cnpj: removeSpecialChars(cnpj),
      cep: removeSpecialChars(cep),
      telefoneFixo: removeSpecialChars(telefoneFixo),
      telefoneCelular: removeSpecialChars(telefoneCelular),
      telefoneResponsavel: removeSpecialChars(telefoneResponsavel),
      telefoneDiretor: removeSpecialChars(telefoneDiretor),
      telefoneSecretario: removeSpecialChars(telefoneSecretario)
    };
    console.log(auxInstitution);
    const { senha, confirmarSenha } = auxInstitution;
    if (!institutionId && senha !== confirmarSenha) {
      return toast.error('As senhas estão diferentes!');
    }
    delete auxInstitution.confirmarSenha;
    try {
      institutionId
        ? await api.put(`/institutions/${institutionId}`, auxInstitution)
        : await api.post('/institutions', auxInstitution);
      toast.success('Os dados foram salvos com sucesso.');
      return history.push('/gerenciar-inst');
    } catch (err) {
      const { error } = err.response.data;
      return toast.error(error);
    }
  };

  const [{ data, loading, handleChange, handleSubmit, handleSelectChange, setLoading }] = useForm(
    callbackSubmit,
    initialState,
    institutionId && `/institutions/${institutionId}`
  );

  const PANES = [
    {
      menuItem: 'Passo 1',
      render: () => (
        <>
          <Pane title="Dados Cadastrais">
            <FormMaintenedInstitution
              isRegister
              handleInputChange={handleChange}
              values={data}
              handleSelectChange={handleSelectChange}
              loading={loading}
              setLoading={setLoading}
            />
          </Pane>

          <CustomButton
            disabled={loading}
            content="Próximo"
            color="teal"
            floated="right"
            activeindex={activeindex}
            onClick={() => setIndex(activeindex + 1)}
          />
        </>
      )
    },
    {
      menuItem: 'Passo 2',
      render: () => (
        <>
          <Pane title="Dados da minha conta">
            <FormAccount handleInputChange={handleChange} values={data} isStepForm loading={loading} />
            {!institutionId && (
              <PasswordForm loading={loading}>
                <Form.Input
                  name="senha"
                  type="password"
                  onChange={handleChange}
                  value={data.senha}
                  fluid
                  label="Senha da Instituição"
                />
                <Form.Input
                  fluid
                  label="Confirme sua senha"
                  name="confirmarSenha"
                  type="password"
                  onChange={handleChange}
                  value={data.confirmarSenha}
                />
              </PasswordForm>
            )}
          </Pane>
          <CustomButton
            primary
            content="Salvar"
            id="idSalvar"
            className={activeindex !== 2 && 'hide'}
            floated="right"
            disabled={loading}
            onClick={handleSubmit}
          />
          <CustomButton
            disabled={loading}
            content="Anterior"
            id="idAnterior"
            color="teal"
            onClick={() => {
              setIndex(activeindex - 1);
            }}
          />
        </>
      )
    }
  ];

  return (
    <Dashboard adm title={!institutionId ? "Criar Instituição" : "Editar Instituição"} showSideBar>
      <Button primary onClick={() => history.push('/gerenciar-inst')} disabled={loading}>
        Voltar
      </Button>
      <TabContainer>
        <Tab menu={{ secondary: true, pointing: true }} activeIndex={activeindex} panes={PANES} />
      </TabContainer>
    </Dashboard>
  );
};

export default SignUp;
