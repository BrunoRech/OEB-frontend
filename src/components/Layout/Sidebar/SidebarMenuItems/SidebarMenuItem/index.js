import React from 'react';
import { Icon } from 'semantic-ui-react';
import {Item, ItemLink} from './styles';

export default ({ link, iconName, title, open, onClickHandler }) => {
  const linkComponent = (
    <ItemLink to={link} title={!open ? title : null} open={open} onClick={onClickHandler}>
      <Icon name={iconName} /> {open ? title : null}
    </ItemLink>
  );

  return <Item>{linkComponent}</Item>;
};
