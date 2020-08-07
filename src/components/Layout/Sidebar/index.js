import React, { useState } from 'react';
import SidebarMenuItems from './SidebarMenuItems/SidebarMenuItems';
import SidebarMenuItemsAdm from './SidebarMenuItems/SidebarMenuItemsAdm';
import { Sidebar, Wrapper, Content } from './styles';

export default ({ adm }) => {
  const [open, handleOpenSidebar] = useState(false);

  const handleOpen = () => {
    handleOpenSidebar(!open);
  };

  return (
    <Sidebar>
      <Wrapper open={open}>
        <Content open={open}>
          {adm ? (
            <SidebarMenuItemsAdm handleOpen={handleOpen} open={open} />
          ) : (
            <SidebarMenuItems handleOpen={handleOpen} open={open} />
          )}
        </Content>
      </Wrapper>
    </Sidebar>
  );
};
