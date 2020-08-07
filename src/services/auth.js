import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = '@OEB-token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getCurrentInstitution = () => {
  const token = getToken();
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
