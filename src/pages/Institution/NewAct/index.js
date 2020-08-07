import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form } from 'semantic-ui-react';
import { parseISO, isDate, isValid } from 'date-fns';
import { DatePicker } from '../../../components/Utils';
import { Dashboard } from '../../../components/Layout';
import api from '../../../services/api';
import { Act, File, CourseInput, Button } from './styles';
import useForm from '../../../hooks/useForm';
import ActPoles from '../ActPoles';

const CURRICULO_OPTIONS = [
  {
    key: 'base',
    text: 'Base do Território Catarinense',
    value: 'Base do Território Catarinense'
  },
  {
    key: 'proprio',
    text: 'Próprio',
    value: 'Próprio'
  }
];
const ETAPA_OPTIONS = [
  {
    key: 'infantil',
    text: 'Infantil',
    value: 'Infantil'
  },
  {
    key: 'fundamental',
    text: 'Fundamental',
    value: 'Fundamental'
  },
  {
    key: 'medio',
    text: 'Médio',
    value: 'Médio'
  },
  {
    key: 'profissional',
    text: 'Profissional',
    value: 'Profissional'
  },
  {
    key: 'eja',
    text: 'EJA',
    value: 'EJA'
  },
  {
    key: 'indigena',
    text: 'Escola indígena',
    value: 'Escola Indígena'
  }
];
const MEDIACAO_OPTIONS = [
  {
    key: 'presencial',
    text: 'Presencial',
    value: 'Presencial'
  },
  {
    key: 'semi',
    text: 'Semi-presencial',
    value: 'Semi-Presencial'
  },
  {
    key: 'ead',
    text: 'EAD',
    value: 'EAD'
  }
];
const DOC_OPTIONS = [
  {
    key: 'decreto',
    text: 'Decreto',
    value: 'Decreto'
  },
  {
    key: 'portaria',
    text: 'Portaria',
    value: 'Portaria'
  }
];
const initialState = {
  arquivoAto: '',
  arquivoCurriculo: '',
  arquivoParecer: '',
  curriculo: '',
  etapasEnsino: 'Infantil',
  numeroAto: '',
  parecer: '',
  tipoAto: 'Decreto',
  tipoCurriculo: 'Base do Território Catarinense',
  tipoMediacao: 'Presencial',
  validadeTipoAto: '',
  validadeCurriculo: '',
  validadeParecer: ''
};

export default ({ history, match }) => {
  const [actId, setActId] = useState(match.params.id);
  const [addPoles, setAddPoles] = useState(false);
  const [filesId, setFilesId] = useState({ ato: '', curriculo: '', parecer: '' });

  const callbackSubmit = async () => {
    try {
      const auxData = { ...data };
      const { arquivoAto, arquivoCurriculo, arquivoParecer } = auxData;
      const bodyFormData = new FormData();
      if (!actId) {
        if (data.tipoCurriculo && data.tipoCurriculo === 'Próprio') {
          bodyFormData.set('file', arquivoCurriculo);
          const { data: arquivoCurriculoResponse } = await api.post(`/files`, bodyFormData);
          auxData.arquivoCurriculo = arquivoCurriculoResponse._id;
        } else {
          delete auxData.curriculo;
          delete auxData.arquivoCurriculo;
          delete auxData.validadeCurriculo;
        }
        bodyFormData.set('file', arquivoAto);
        const { data: arquivoAtoResponse } = await api.post(`/files`, bodyFormData);
        bodyFormData.set('file', arquivoParecer);
        const { data: arquivoParecerResponse } = await api.post(`/files`, bodyFormData);

        auxData.arquivoAto = arquivoAtoResponse._id;
        auxData.arquivoParecer = arquivoParecerResponse._id;
        const { data: newAct } = await api.post(`/acts`, auxData);
        setActId(newAct._id);
        if (auxData.tipoMediacao === 'EAD') {
          return setAddPoles(true);
        }
        toast.success('Os dados foram salvos com sucesso.');
        history.push('/atos-legais');
      } else {
        const { ato: atoId, curriculo: curriculoId, parecer: parecerId } = filesId;
        if (typeof arquivoAto === 'object') {
          bodyFormData.set('file', arquivoAto);
          const { data: ato } = await api.put(`/files/${atoId}`, bodyFormData);
          auxData.arquivoAto = ato._id;
        }
        if (typeof arquivoCurriculo === 'object') {
          bodyFormData.set('file', arquivoCurriculo);
          if (!curriculoId) {
            const { data: curriculoResponse } = await api.post(`/files`, bodyFormData);
            auxData.arquivoCurriculo = curriculoResponse._id;
          } else {
            const { data: curriculo } = await api.put(`/files/${curriculoId}`, bodyFormData);
            auxData.arquivoCurriculo = curriculo._id;
          }
        }
        if (typeof arquivoParecer === 'object') {
          bodyFormData.set('file', arquivoParecer);
          const { data: parecer } = await api.put(`/files/${parecerId}`, bodyFormData);
          auxData.arquivoParecer = parecer._id;
        }

        await api.put(`/acts/${actId}`, auxData);
        if (auxData.tipoMediacao === 'EAD') {
          return setAddPoles(true);
        }
        toast.success('Os dados foram atualizados com sucesso.');
        history.push('/atos-legais');
      }
    } catch (err) {
      const { error: dataError } = err.response.data;
      toast.error(dataError);
    }
  };

  const [
    {
      data,
      loading,
      handleChange,
      handleSubmit,
      setData,
      handleSelectChange,
      handleFileChange,
      handleDateChange,
      setLoading
    }
  ] = useForm(callbackSubmit, initialState);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.get(`/acts/${actId}`);
      const { data: responseData } = response;
      const { arquivoAto, arquivoCurriculo, arquivoParecer } = responseData;
      setFilesId({ ato: arquivoAto, curriculo: arquivoCurriculo, parecer: arquivoParecer });
      const { validadeCurriculo, validadeParecer, validadeTipoAto } = responseData;
      if (validadeCurriculo) {
        responseData.validadeCurriculo = isValid(new Date(parseISO(validadeCurriculo)))
          ? new Date(parseISO(validadeCurriculo))
          : '';
      }
      responseData.validadeParecer = new Date(parseISO(validadeParecer));
      responseData.validadeTipoAto = new Date(parseISO(validadeTipoAto));
      setData(responseData);
      setLoading(false);
    };

    if (actId) {
      fetchData();
    }
  }, [actId, setData, setFilesId, setLoading]);

  const handleFileLabel = (name, file) => {
    if (actId) {
      return `Alterar o Arquivo do ${name}`;
    }
    if (file) {
      return 'Arquivo Selecionado';
    }
    return `Selecione o Arquivo do  ${name}`;
  };

  return addPoles ? (
      <ActPoles history={history} handleGoBack={() => history.push('/atos-legais')} actId={actId} />
  ) : (
    <Dashboard title="Novo ato" showSideBar>
      <Form onSubmit={handleSubmit} loading={loading} autoComplete="off">
        <Act>
          <Form.Group widths="equal">
            <Form.Select
              onChange={handleSelectChange}
              fluid
              name="etapasEnsino"
              label="Etapas de Ensino"
              options={ETAPA_OPTIONS}
              value={data.etapasEnsino}
              text={data.etapasEnsino}
            />
            {data.etapasEnsino === 'Profissional' && (
              <CourseInput onChange={handleChange} name="curso" label="Nome do Curso" value={data.curso} />
            )}

            <Form.Select
              onChange={handleSelectChange}
              fluid
              name="tipoMediacao"
              label="Tipo de Mediação"
              options={MEDIACAO_OPTIONS}
              value={data.tipoMediacao}
              text={data.tipoMediacao}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Select
              onChange={handleSelectChange}
              fluid
              name="tipoCurriculo"
              label="Tipo de Currículo"
              options={CURRICULO_OPTIONS}
              value={data.tipoCurriculo}
              text={data.tipoCurriculo}
            />
            {data.tipoCurriculo === 'Próprio' && (
              <>
                <Form.Input onChange={handleChange} fluid name="curriculo" label="Currículo" value={data.curriculo} />
                <File
                  fluid
                  accept="image/x-png,image/gif,image/jpeg"
                  label={handleFileLabel('Currículo', data.arquivoCurriculo)}
                  name="arquivoCurriculo"
                  onChange={event => handleFileChange(event)}
                  id="arquivo-curriculo"
                  type="file"
                />
                <div>
                  <Form.Input label="Validade Currículo">
                    <DatePicker
                      selected={isDate(data.validadeCurriculo) ? data.validadeCurriculo : ''}
                      handleChange={date => handleDateChange(date, 'validadeCurriculo')}
                      value={data.validadeCurriculo}
                    />
                  </Form.Input>
                </div>
              </>
            )}
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input onChange={handleChange} fluid name="parecer" label="Parecer" value={data.parecer} />
            <File
              fluid
              accept="image/x-png,image/gif,image/jpeg"
              label={handleFileLabel('Parecer', data.arquivoParecer)}
              name="arquivoParecer"
              onChange={event => handleFileChange(event)}
              id="arquivo-parecer"
              type="file"
            />
            <div>
              <Form.Input label="Validade Parecer">
                <DatePicker
                  selected={isDate(data.validadeParecer) ? data.validadeParecer : ''}
                  handleChange={date => handleDateChange(date, 'validadeParecer')}
                  value={data.validadeParecer}
                />
              </Form.Input>
            </div>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Select
              onChange={handleSelectChange}
              fluid
              name="tipoAto"
              label="Selecione o Tipo de Ato"
              options={DOC_OPTIONS}
              value={data.tipoAto}
              text={data.tipoAto}
            />
            <Form.Input
              onChange={handleChange}
              name="numeroAto"
              type="number"
              label="Número do Ato"
              value={data.numeroAto}
            />
            <File
              fluid
              accept="image/x-png,image/gif,image/jpeg"
              label={handleFileLabel('Ato', data.arquivoAto)}
              name="arquivoAto"
              onChange={event => handleFileChange(event)}
              id="arquivoAto"
              type="file"
            />
            <div>
              <Form.Input label="Validade do Ato">
                <DatePicker
                  selected={isDate(data.validadeTipoAto) ? data.validadeTipoAto : ''}
                  handleChange={date => handleDateChange(date, 'validadeTipoAto')}
                  name="validadeTipoAto"
                  value={data.validadeTipoAto}
                />
              </Form.Input>
            </div>
          </Form.Group>
          <Button onClick={() => history.push('/atos-legais')} color="red" disabled={loading}>
            Voltar
          </Button>
          <Button type="submit" floated="right" primary disabled={loading}>
            {data.tipoMediacao === 'EAD' ? 'Vincular polos' : 'Salvar'}
          </Button>
        </Act>
      </Form>
    </Dashboard>
  );
};
