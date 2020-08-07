import React from 'react';
import { Link } from 'react-router-dom';
import { Dashboard, Sign } from '../../../components/Layout';

const DashboardPage = ({ privateSession }) => {
  return privateSession ? (
    <Dashboard title="Página não Encontrada">
      <h4>Infelizmente a página desejada não pode ser encontrada.</h4>
      Se quiser você pode voltar a página inicial clicando <Link to="/dashboard">aqui</Link>.
    </Dashboard>
  ) : (
    <Sign title="Página não Encontrada">
      <p>
        Infelizmente a página desejada por você não pode ser encontrada. Se quiser você pode voltar a página de{' '}
        <Link to="/login">login</Link>.
      </p>
    </Sign>
  );
};

export default DashboardPage;
