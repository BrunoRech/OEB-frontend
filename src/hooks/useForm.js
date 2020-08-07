import { useState, useEffect } from 'react';
import api from '../services/api';

const useForm = (callback, initialState, url) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await api.get(url);
        setData(result.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    if (url) {
      fetchData();
    }
  }, [url]);

  const handleChange = event => {
    const { target } = event;
    const { name, value } = target;
    const auxData = { ...data };
    auxData[name] = value;
    setData(auxData);
  };

  const handleSelectChange = (event, { name, value }) => {
    const auxData = { ...data };
    auxData[name] = value;
    setData(auxData);
  };

  const handleSubmit = async event => {
    if (event) {
      event.preventDefault();
    }
    setLoading(true);
    await callback();
    setLoading(false);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    const { name } = event.target;
    const auxActs = { ...data };
    auxActs[name] = file;
    setData(auxActs);
  };

  const handleDateChange = (date, name) => {
    const auxActs = { ...data };
    auxActs[name] = date;
    setData(auxActs);
  };

  return [
    {
      data,
      loading,
      handleChange,
      handleSubmit,
      setData,
      handleSelectChange,
      handleFileChange,
      handleDateChange,
      setLoading
    }
  ];
};

export default useForm;
