import api from '../../../../services/api';

export const updateForms = async (setLoading, setForms) => {
  setLoading(true);
  const { data } = await api.get(`/forms`);
  setForms(data);
  setLoading(false);
};

export const updateLegalRequirements = async (formId, setLoading, setRequirements) => {
  setLoading(true);
  const { data } = await api.get(`/forms/${formId}/legal-requirements`);
  setRequirements(data);
  setLoading(false);
};
export const updateDimensions = async (formId, setLoading, setDimensions) => {
  setLoading(true);
  const { data } = await api.get(`/forms/${formId}/dimensions`);
  setDimensions(data);
  setLoading(false);
};

export const updateIndicators = async (dimId, setLoading, setIndicators) => {
  if (dimId) {
    setLoading(true);
    const { data } = await api.get(`/dimensions/${dimId}/indicators`);
    setIndicators(data);
    setLoading(false);
  }
};

export const updateCriteria = async (indId, setLoading, setCriteria) => {
  if (indId) {
    setLoading(true);
    const { data } = await api.get(`/indicators/${indId}/criteria`);
    setCriteria(data);
    setLoading(false);
  }
};

export const updateDescription = async (indId, setLoading, setDescriptions) => {
  if (indId) {
    setLoading(true);
    const { data } = await api.get(`/indicators/${indId}/criteria-descriptors`);
    setDescriptions(data);
    setLoading(false);
  }
};

export const fetchForms = async (setLoading, setForms) => {
  setLoading(true);
  const { data } = await api.get('/forms');
  setForms(
    data.map(form => {
      return {
        key: form._id,
        text: `${form.titulo} - ${form.anoAplicacao}`,
        value: form._id,
        situacao: form.situacao
      };
    })
  );
  setLoading(false);
};

export const fetchDimensions = async (formId, setLoading, setDimensions) => {
  setLoading(true);
  const { data } = await api.get(`/forms/${formId}/dimensions`);
  setDimensions(
    data.map(dimension => {
      return {
        key: dimension._id,
        text: `${dimension.titulo}`,
        value: dimension._id
      };
    })
  );
  setLoading(false);
};

export const fetchIndicators = async (dimId, setLoading, setIndicators) => {
  setLoading(true);
  const { data } = await api.get(`/dimensions/${dimId}/indicators`);
  setIndicators(
    data.map(indicator => {
      return {
        key: indicator._id,
        text: `${indicator.titulo}`,
        value: indicator._id
      };
    })
  );
  setLoading(false);
};

export const findFormSituation = (forms, formId, setActions) => {
  const form = forms.filter(element => element.value === formId)[0];
  setActions(form ? form.situacao === '2' : true);
};

export const findFormName = (forms, formId) => {
  const form = forms.find(element => element.key === formId);
  return form ? form.text : 'Avaliações';
};

export const findDimensionName = (dimensions, dimId) => {
  const dimension = dimensions.find(element => element.key === dimId);
  return dimension ? dimension.text : 'Dimensões';
};

export const findIndicatorName = (indicators, indId) => {
  const indicator = indicators.find(element => element.key === indId);
  return indicator ? indicator.text : 'Indicadores';
};
