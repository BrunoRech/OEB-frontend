import styled from 'styled-components';

const Footer = styled.footer`
display: flex;
position: absolute;
bottom: 0;
height: 80px;
width: 100%;
background: ${props => props.transparent ? 'transparent' : 'rgba(238, 238, 238, 0.6)'};

.grid-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

& img {
  width: 120px;
  background-repeat: no-repeat;
  background-position: center;
}
`;

export default Footer;

