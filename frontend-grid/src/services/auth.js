export const TOKEN_KEY = "inpe";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, id, email, name) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("id", id);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
};

function refreshPage() {
  window.location.reload(false);
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("id");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("user");
  refreshPage();
};
