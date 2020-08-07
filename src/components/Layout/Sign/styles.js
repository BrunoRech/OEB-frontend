import styled from 'styled-components';
import background from '../../../assets/images/bg_login.jpg';

export const Wrapper = styled.section`
  display: flex;
  width: 100vw;
  background-color: #ffffff;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

export const Image = styled.div`
  background-image: url('${background}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
`;

export const Left = styled.div`
  width: 72vw;
  max-width: 72vw;
  height: 100vh;
  position: relative;

  @media only screen and (max-width: 1260px) {
    width: 64vw;
    max-width: 64vw;
  }

  @media only screen and (max-width: 960px) {
    width: 52vw;
    max-width: 52vw;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const Right = styled.div`
  margin-top: 3rem;
  padding: 40px;
  width: 28vw;

  @media only screen and (max-width: 1260px) {
    width: 36vw;
    max-width: 36vw;
  }

  @media only screen and (max-width: 960px) {
    width: 48vw;
    max-width: 48vw;
  }

  @media only screen and (max-width: 768px) {
    width: 85vw;
    max-width: 85vw;
    margin: 100px auto;
    padding: 0;
  }
`;

export const Title = styled.h1`
  font-size: 1.3rem;
  padding-bottom: 10px;
  font-family: var(--font-secondary);
  font-weight: 200;
`;

export const Adm = styled.h1`
  font-size: 1.0rem;
  padding-bottom: 30px;
  font-family: var(--font-secondary);
  font-weight: 200;
  text-align: right;
`;

export const SubTitle = styled.h2`
  font-size: 1.2rem;
  padding-bottom: 10px;
  font-family: var(--font-secondary);
  font-weight: 200;
`;
