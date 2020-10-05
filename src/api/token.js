export const getToken = async () => {
    try {
      const value = await localStorage.getItem('@auth_token');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      return null;
    }
  };
  
  export const setToken = async (token) => {
    try {
      await localStorage.setItem('@auth_token', token);
    } catch (e) {
      return null;
    }
  };