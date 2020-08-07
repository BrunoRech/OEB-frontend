import styled from 'styled-components';

export const Sidebar = styled.header`
  flex: 0 0 auto;
`;

export const Wrapper = styled.div`
  flex: 1 0 auto;
  white-space: nowrap;
  z-index: 1200;
  display: flex;
  overflow-y: auto;
  width: ${props => (props.open ? '240px' : '75px')};
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  left: 0;
  right: auto;
  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  top: 0;
  height: 100%;
  outline: none;
  -webkit-overflow-scrolling: touch;
  position: relative;
  background-color: var(--sidebar);
`;

export const Content = styled.div`
  height: 100vh;
  z-index: 4;
  position: relative;
  overflow: auto;
  position: fixed;
  transition: width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  width: ${props => (props.open ? '240px' : '75px')};
  box-sizing: border-box;
`;
