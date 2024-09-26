import { Navigate, useLocation } from 'react-router-dom';
import useAuthentication from './shared/methods/useAuthentication';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useAuthentication();
  const location = useLocation();

  if (isAuthenticated === null) {
    if (isAuthenticated === null) {
      return <h1 style={{color: "#356E73", textAlign: "center", fontSize: "50px"}}>Carregando ...</h1>;
    }
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

