import React, { useState, useEffect } from 'react';
import { Icon, Button, Label } from 'semantic-ui-react';
import { Dashboard } from '../../../components/Layout';
import { CustomTable } from '../../../components/Tables';
import api from '../../../services/api';

export default ({ history }) => {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      const { data } = await api.get('/self-assessment-response');
      setEvaluations(data);
    };

    fetchEvaluations();
  }, []);

  const COLLUMNS = [
    {
      label: 'Situação',
      content: avaliacao => (
        <>
          {avaliacao.respondido === false ? (
            <Label color="red">Não respondido</Label>
          ) : (
            <Label color="green">Respondido</Label>
          )}
        </>
      )
    },
    {
      path: 'formulario.titulo',
      label: 'Nome',
      width: 5
    },
    {
      path: 'formulario.anoAplicacao',
      label: 'Ano'
    },
    {
      label: 'Ações',
      content: avaliacao => (
        <>
          {avaliacao.respondido === false ? (
            <Button
              inverted
              size="big"
              title="Responder Avaliação"
              color="green"
              icon={<Icon name="pencil" />}
              onClick={() => history.push(`/responder-avaliacao/${avaliacao.formulario._id}`)}
            />
          ) : (
            <Button
              inverted
              size="big"
              title="Verificar Respostas"
              color="orange"
              icon={<Icon name="clipboard" />}
              onClick={() => history.push(`/responder-avaliacao/${avaliacao.formulario._id}`)}
            />
          )}
        </>
      )
    }
  ];

  return (
    <>
      <Dashboard title="Avaliações" showSideBar>
        <CustomTable data={evaluations} columns={COLLUMNS} />
      </Dashboard>
    </>
  );
};
