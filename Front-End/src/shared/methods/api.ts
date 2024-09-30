import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

api.interceptors.request.use(config => {

  let token = null

  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token')
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  response => {
    return response
  },

  error => {
    if (error.response) {
      const { status, data } = error.response

      const { title, message } = getError(status, data.title || data, data.message || data)
      return Promise.reject({ title, message })
    
    } else {
      return Promise.reject({ 
        title: "Erro de Conexão",
        message: "Erro de conexão. Verifique sua rede ou tente novamente mais tarde."
        
      })
    }
  })

const getError = (status: number, title: any, message: any): { title: string, message: string } => {
  switch (status) {
    case 400:
      return {title:(title || "Requisição inválida!"), message:(message || "Erro na solicitação.")}

    case 401:
      return {title:(title || "Erro de autenticação!"), message:(message || "Não autorizado.")}

    case 403:
      return {title:(title || "Acesso negado!"), message:(message || "Você não tem permissão para acessar este recurso.")}

    case 404:
      return {title:(title || "Recurso não encontrado!"), message:(message || "O recurso solicitado não foi encontrado.")}

    case 500:
      return {title:(title || "Erro interno do servidor!"), message:(message || "Ocorreu um erro no servidor.")}

    default:
      return {title:(title || "Erro inesperado!"), message:(message || "Ocorreu um erro. Tente novamente mais tarde.")}
  }
}

export default api;