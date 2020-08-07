import React, { useState } from 'react';
import { Dashboard } from '../../../components/Layout';
import PublicConsult from '../../../components/PublicConsult';

export default () => {
  const [showSideBar, handleSideBar] = useState(true);

  return (
    <>
      <Dashboard title="Validação de Atos legais" adm showSideBar={showSideBar}>
        <PublicConsult isAdm handleSideBar={handleSideBar} />
      </Dashboard>
    </>
  );
};
