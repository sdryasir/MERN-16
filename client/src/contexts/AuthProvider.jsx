import React, {createContext, useContext, useState, useEffect} from 'react'
import { useFetch } from '../hook/useFetch';


const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const {data, error, loading} = useFetch(`${import.meta.env.VITE_API_URL}/users/me`);

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data) setUser(data);
  }, [data]);

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include', // important for cookies
      });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{user, error, loading, logout}}>
        {children}
    </AuthContext.Provider> 
  )
}

export default AuthProvider;


export const useAuth = ()=> useContext(AuthContext);

