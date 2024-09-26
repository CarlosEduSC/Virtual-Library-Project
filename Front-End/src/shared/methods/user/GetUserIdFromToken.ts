import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = (token: string): string => {
  try {
    const decodedToken = jwtDecode<any>(token);

    if (decodedToken) {
      return decodedToken.id;
    }

    console.error("Campo 'id' não encontrado no token");

    return "";

  } catch (error) {
    console.error("Erro ao decodificar o token", error);
    return ""
  }
};

export default getUserIdFromToken