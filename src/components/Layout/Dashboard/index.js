import React from 'react';
import Helmet from 'react-helmet';
import * as S from './styles';
import Sidebar from '../Sidebar';

export default ({ children, title, adm, showSideBar }) => (
  <S.Wrapper>
    <Helmet title="Observatório de Educação Básica" />
    {showSideBar && <Sidebar adm={adm} />}
    <S.MainWrapper>
      <S.MainContainer>
        <S.MainTitle>{title}</S.MainTitle>
        {children}
      </S.MainContainer>
    </S.MainWrapper>
  </S.Wrapper>
);
