import React from 'react';
import List from '../styles';
import { logout } from '../../../../../services/auth';
import SidebarMenuItem from '../SidebarMenuItem';

export default ({ handleOpen, open }) => {
  return (
    <List>
      <SidebarMenuItem onClickHandler={handleOpen} iconName={open ? 'align right' : 'align left'} link="#" />
      <SidebarMenuItem open={open} link="/dashboardAdm" iconName="home" title="Página Inicial" />
      <SidebarMenuItem open={open} link="/instituicoes-adm" iconName="building" title="Validar Atos" />
      <SidebarMenuItem open={open} link="/formularios" iconName="tasks" title="Avaliação Institucional" />
      <SidebarMenuItem open={open} link="/gerenciar-inst" iconName="address book" title="Gerenciar Instituições" />
      <SidebarMenuItem open={open} link="/minha-conta-adm" iconName="user" title="Minha Conta" />
      <SidebarMenuItem open={open} link="/cadastro-adm" iconName="address card" title="Cadastrar Administrador" />
      <SidebarMenuItem open={open} link="#" onClickHandler={() => logout()} iconName="log out" title="Sair" />
    </List>
  );
};
