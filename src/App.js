import React from 'react';
import Normalize from 'react-normalize';
import { toast } from 'react-toastify';
import GlobalStyle from './assets/css/global';
import Routes from './routes';

toast.configure({
  position: 'top-right',
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  newestOnTop: true
});

function App() {
  return (
    <React.Fragment>
      <Routes />
      <Normalize />
      <GlobalStyle />
    </React.Fragment>
  );
}

export default App;
