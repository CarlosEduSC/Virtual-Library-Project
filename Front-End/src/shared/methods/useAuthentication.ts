import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { verifyUser } from './user/VerifyUser';

const useAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isUserAuthenticated = await verifyUser();
        setIsAuthenticated(isUserAuthenticated);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [location.pathname]);

  return isAuthenticated;
};

export default useAuthentication;