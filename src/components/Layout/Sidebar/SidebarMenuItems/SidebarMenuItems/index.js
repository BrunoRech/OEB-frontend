import React from 'react';
import List from '../styles';
import { logout } from '../../../../../services/auth';
import SidebarMenuItem from '../SidebarMenuItem';

export default ({ handleOpen, open }) => {
  return (
    <List>
      <SidebarMenuItem onClickHandler={handleOpen} iconName={open ? 'align right' : 'align left'} link="#" />
      <SidebarMenuItem open={open} link="/dashboard" iconName="home" title="Página Inicial" />
      <SidebarMenuItem open={open} link="/atos-legais" iconName="file pdf outline" title="Atos Legais" />
      <SidebarMenuItem open={open} link="/polos" iconName="sitemap" title="Polos" />
      <SidebarMenuItem open={open} link="/avaliacoes" iconName="paste" title="Avaliações" />
      <SidebarMenuItem open={open} link="/dashboard" iconName="archive" title="Censo OEB" />
      <SidebarMenuItem open={open} link="/instituicao-mantida" iconName="building" title="Dados Institucionais" />
      <SidebarMenuItem open={open} link="/minha-conta" iconName="user" title="Minha Conta" />
      <SidebarMenuItem open={open} link="#" onClickHandler={() => logout()} iconName="log out" title="Sair" />
    </List>
  );
};
