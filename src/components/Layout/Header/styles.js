import styled from 'styled-components';

export const Container = styled.div`
  height: 64px;
  background: #fff;
  padding: 0 30px;
  position: fixed;
  top: 0;
  width: 100%;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      padding-left: 20px;
      height: 40px;
    }
    strong {
      display: flex;
      align-items: center;
      font-weight: bold;
      color: #000;
      border-left: 1px solid #eee;
      padding-left: 20px;
      height: 40px;
      font-size: 18px;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  div {
    text-align: right;
    margin-right: 10px;
    strong {
      display: block;
      color: #333;
    }
  }
`;
