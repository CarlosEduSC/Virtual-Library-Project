import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { verifyUser } from './shared/methods/user/VerifyUser';
import LoadingPage from './pages/LoadingPage';
import getUserTypeFromToken from './shared/methods/user/GetUserTypeFromToken';

interface ProtectedRouteProps {
  element: React.ReactElement
  requiredUserType?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredUserType }) => {
  const location = useLocation();

  const token = localStorage.getItem('token')
  const userType = token ? getUserTypeFromToken(token) : null

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [alertTitle, setAlertTitle] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  useEffect(() => {
    const checkAuthentication = async () => {
      const isUserAuthenticated = await verifyUser((errorTittle, errorMessage) => {
        setAlertTitle(errorTittle)
        setAlertMessage(errorMessage)
      });

      setIsAuthenticated(isUserAuthenticated)
      setIsLoading(false)
    };

    checkAuthentication()
  }, []);

  if (isLoading) {
    return (
      <LoadingPage />
    );

  } else if (isAuthenticated) {

    if (requiredUserType) {
      return (userType == requiredUserType ? element :
        <Navigate
          to="/"
          state={{ from: location, alertTitle: "Erro de autenticação!", alertMessage: "Você não tem permissão para acessar essa pagina." }}
          replace
        />
      )
    }

    return element

  } else {
    return (location.pathname != "/" ?
      <Navigate
        to="/login"
        state={{ from: location, alertTitle: alertTitle, alertMessage: alertMessage }}
        replace
      /> :

      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />)
  }
}

export default ProtectedRoute;