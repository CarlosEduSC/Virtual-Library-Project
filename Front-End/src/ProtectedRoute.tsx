import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { verifyUser } from './shared/methods/user/VerifyUser';
import LoadingPage from './pages/LoadingPage';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const isUserAuthenticated = await verifyUser((errorTittle, errorMessage) => {
        setAlertTitle(errorTittle)
        setAlertMessage(errorMessage)
      });

      setIsAuthenticated(isUserAuthenticated);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return (
      <LoadingPage />
    );
  }

  return (isAuthenticated ? element : location.pathname != "/" ?
    <Navigate
      to="/login"
      state={{ from: location, alertTitle: alertTitle, alertMessage: alertMessage }}
      replace
    /> :

    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  )
}

export default ProtectedRoute;