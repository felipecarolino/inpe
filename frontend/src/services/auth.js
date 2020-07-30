import api from './api';

export const TOKEN_KEY = "inpe";

function refreshPage() {
  window.location.reload(false);
}

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, id, email, name) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("id", id);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("user");
  refreshPage();
};

export async function validateToken() {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } }
  const result = await api.post('checkToken', config);
  console.log(result.data)
  if(result.data.message === "Token valid!") {
    return true;
  }
  else {
    return false;
  }
}