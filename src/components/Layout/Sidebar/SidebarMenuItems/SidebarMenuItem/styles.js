import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Item = styled.li`
  width: 100%;
  position: relative;
  font-family: var(--font-primary);
  align-items: center;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  margin: 0.6rem 0 0 0;
`;

export const ItemLink = styled(Link)`
  display: block;
  padding: 15px 0;
  opacity: 1;
  line-height: 30px;
  border: none;
  background: none;
  border-radius: 0.25rem;
  outline: none;
  cursor: pointer;
  text-align: ${props => (props.open ? 'left' : 'center')};
  ${props => (props.open ? 'padding: 15px 25px' : null)};
  color: var(--sidebar-color);

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }

  & > i {
    font-size: 18px;
  }
`;
