import React from 'react';
import * as S from './styles';

const Pane = ({ children, title }) => {
  return (
    <React.Fragment>
      <S.Title>{title}</S.Title>
      <S.TabPane>{children}</S.TabPane>
    </React.Fragment>
  );
};

export default Pane;
