import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';



const AuthGuard = ({ children }: any) => {
  let {
    isAuthenticated,
  } = useAuth();
  const { pathname } = useLocation();

  const authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
