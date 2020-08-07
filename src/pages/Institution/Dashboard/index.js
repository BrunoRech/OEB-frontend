import React, { useState } from 'react';
import { Dashboard } from '../../../components/Layout';
import Notification from '../../../components/Notification';

export default ({ history }) => {
  const [showSideBar, handleSideBar] = useState(true);
  return (
    <Dashboard title="Dashboard" showSideBar={showSideBar}>
      <Notification handleSideBar={handleSideBar} history={history} />
    </Dashboard>
  );
};
