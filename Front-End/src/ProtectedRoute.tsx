import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { verifyUser } from './shared/methods/user/VerifyUser';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();

  const color = "#356E73"

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const [alertTittle, setAlertTittle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const checkAuthentication = async () => {
      const isUserAuthenticated = await verifyUser((errorTittle, errorMessage) => {
        setAlertTittle(errorTittle)
        setAlertMessage(errorMessage)
      });

      setIsAuthenticated(isUserAuthenticated);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >

        <h1
          style={{
            color: color,
            textAlign: "center",
            fontSize: "50px"
          }}
        >Carregando</h1>

        <LoadingSpinner
          circleColor={color}
          barColor='#7EBDC2'
          size={25}
          borderSize={10}
        />
      </div>
    );
  }

  return (isAuthenticated ? element :
    <>
      <Navigate
        to="/login"
        state={{ from: location, alertTittle: alertTittle, alertMessage: alertMessage }}
        replace
      />
    </>
  )
}

export default ProtectedRoute;