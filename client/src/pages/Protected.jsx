import React from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { Navigate } from 'react-router';

function Protected({children}) {
  const {user, error, loading} = useAuth();

    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>Something went wrong</h1>;

    if(!user?.fullname) return <Navigate to={'/signin'} replace/>

  return <> {children} </>
}

export default Protected