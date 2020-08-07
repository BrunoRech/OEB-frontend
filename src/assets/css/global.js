import { createGlobalStyle } from 'styled-components';
import BrandFont from '../fonts/FFF_Tusj.ttf';
import Roboto from '../fonts/Roboto-Regular.ttf';
import RobotoLight from '../fonts/Roboto-Light.ttf';

export default createGlobalStyle`
  :root {
    --bg: #DEE3EB;
    --sidebar: #FFF;
    --primary: rgba(0, 0, 0, .87);
    --sidebar-color: #818E94;
    --secondary: #555;
    --font-primary: 'Roboto Light', sans-serif;
    --font-secondary: 'Roboto', sans-serif;
    --font-brand: 'Tusj', sans-serif;
  }

  @font-face {
    font-family: "Tusj";
    src: url('${BrandFont}');
  }

  @font-face {
    font-family: "Roboto";
    src: url('${Roboto}');
  }

  @font-face {
    font-family: "Roboto Light";
    src: url('${RobotoLight}');
  }

  input {
    box-sizing : border-box;
  }

  body {
    font-weight: 300;
    color: var(--primary);
    background-color: var(--bg);
  }

  h1 {
    font-size: 2.2222222222222223rem;
  }

  h2 {
    font-size: 2.0rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary);
    font-family: 'Roboto Light', sans-serif;
  }

  img {
    max-width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .form-internal {
    padding: 15px;
  }

  .hide {
    display: none;
  }

  .main-container {
    background-color: var(--bg);
    height: 100%;
    padding: 25px 45px;
  }

  .main-title {
    font-weight: 700;
    margin-bottom: 1.4rem;
  }

  .form-group {
    /* padding-right: 15px; */
    margin-bottom: 35px;
    margin-top: 8px;
  }
`;
