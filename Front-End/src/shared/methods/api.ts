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
      return { title: (title || "Requisição inválida!"), message: (message || "Falta de parâmetros obrigatórios, JSON inválido, ou campos ausentes.") }

    case 401:
      return { title: (title || "Erro de autenticação!"), message: (message || "Token JWT ausente ou inválido, login expirado.") }

    case 403:
      return { title: (title || "Acesso negado!"), message: (message || "Você não tem permissão para acessar este recurso.") }

    case 404:
      return { title: (title || "Recurso não encontrado!"), message: (message || "O recurso solicitado não foi encontrado.") }

    case 405:
      return { title: (title || "Uso incorreto do método HTTP!"), message: (message || "O método HTTP não é permitido para o recurso solicitado.") }

    case 408:
      return { title: (title || "Lentidão na conexão!"), message: (message || "O servidor não recebeu uma requisição completa dentro do tempo esperado.") }

    case 409:
      return { title: (title || "Conflito de versões!"), message: (message || "Conflito ao tentar criar ou atualizar o recurso.") }

    case 413:
      return { title: (title || "Upload de arquivo muito grande!"), message: (message || "Requisição com um corpo muito grande para ser processado pelo servidor.") }

    case 422:
      return { title: (title || "Dados inválidos!"), message: (message || "O servidor não consegue processar a requisição.") }

    case 500:
      return { title: (title || "Erro interno do servidor!"), message: (message || "Ocorreu um erro no servidor.") }

    case 502:
      return { title: (title || "Problemas com servidores intermediários!"), message: (message || "O servidor proxy recebeu uma resposta inválida de um servidor upstream.") }

    case 503:
      return { title: (title || "Servidor não disponível!"), message: (message || "Manutenção no servidor, sobrecarga de tráfego ou limites de recurso atingidos.") }

    case 504:
      return { title: (title || "Lentidão ou falha na resposta do servidor!"), message: (message || "O servidor proxy não conseguiu uma resposta a tempo de outro servidor upstream.") }

    default:
      return { title: (title || "Erro inesperado!"), message: (message || "Ocorreu um erro. Tente novamente mais tarde.") }
  }
}

export default api;