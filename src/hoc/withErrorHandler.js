import React, { Component } from 'react';
import { toast } from 'react-toastify';

export default (WrappedComponent, axiosInstance) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axiosInstance.interceptors.request.use(
        request => {
          return request;
        },
        () => {
          toast.error('Ocorreu um erro ao receber os dados');
        }
      );

      this.resInterceptor = axiosInstance.interceptors.response.use(
        response => {
          return response;
        },
        error => {
          const { method } = error.response.config;
          const { status } = error.response;
          const errors = ['Ocorreu um erro ao realizar a operação. Tente novamente mais tarde.'];
          if (error.response) {
            if (error.response.data.messages) {
              error.response.data.messages.forEach((item, index) => {
                errors[index] = item.message;
              });
            }
          }

          if (status === 404 || method === 'get') {
            toast.error('Ocorreu um erro ao realizar a operação. Tente novamente mais tarde.');
          } else {
            this.setError(errors);
          }

          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axiosInstance.interceptors.request.eject(this.reqInterceptor);
      axiosInstance.interceptors.response.eject(this.resInterceptor);
    }

    setError = error => {
      this.setState({ error });
    };

    render() {
      const { error } = this.state;
      const { props } = this;
      return (
        <WrappedComponent
          {...props}
          setError={this.setError}
          setGenericError={this.setGenericError}
          error={!error ? null : error}
        />
      );
    }
  };
};
