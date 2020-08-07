import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import CenterDiv from './styles';

const ImageViewer = ({ imageId }) => {
  const [src, setSource] = useState('');

  useEffect(() => {
    const getFile = async () => {
      const { data: file } = await api.get(`/files/${imageId}`, {
        responseType: 'blob'
      });

      setSource(URL.createObjectURL(file));
    };

    getFile();
  }, [imageId]);

  return (
    <CenterDiv>
      <img src={src} alt="" />
    </CenterDiv>
  );
};

export default ImageViewer;
