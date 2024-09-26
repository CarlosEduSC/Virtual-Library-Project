import { jwtDecode } from "jwt-decode";

const getUserTypeFromToken = (token: string): string => {
  try {
    const decodedToken = jwtDecode<any>(token);

    if (decodedToken) {
      return decodedToken.type;
    }

    console.error("Campo 'type' não encontrado no token");

    return "";

  } catch (error) {
    console.error("Erro ao decodificar o token", error);
    return ""
  }
};

export default getUserTypeFromToken