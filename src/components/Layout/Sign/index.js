import React from 'react';
import Helmet from 'react-helmet';
import * as S from './styles';
import Footer from '../Footer';

export default ({ title, children }) => (
  <S.Wrapper>
    <Helmet title={`${title} - Observatório de Educação Básica`} />
    <S.Left>
      <S.Image />
      <Footer />
    </S.Left>
    <S.Right>
      <S.Title>Observatório de Educação Básica</S.Title>
      <S.SubTitle>{title}</S.SubTitle>
      {children}
    </S.Right>
  </S.Wrapper>
);
