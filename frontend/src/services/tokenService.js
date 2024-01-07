// Function to set refresh token in localStorage
export const storeAccessTokenLocalStorage = (token) => {
  localStorage.setItem("access_token", token);
};

export const removeAccessTokenLocalStorage = () => {
  localStorage.removeItem("access_token");
};

// Function to set refresh token in localStorage
export const storeRefreshTokenLocalStorage = (token) => {
  localStorage.setItem("refresh_token", token);
};

export const removeRefreshTokenLocalStorage = () => {
  localStorage.removeItem("refresh_token");
};
