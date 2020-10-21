export const getToken =  () => {
    try {
      const value =  localStorage.getItem('@auth_token');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return null;
    }
  };
  
  export const setToken =  (token) => {
    try {
       localStorage.setItem('@auth_token', token);
    } catch (e) {
      return null;
    }
  };