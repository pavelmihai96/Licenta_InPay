import axios from "axios"
import { jwtDecode } from "jwt-decode"

axios.defaults.baseURL = "http://localhost:8082"
axios.defaults.headers.post["Content-Type"] = "application/json"

export const getAuthenticationToken = () => {
  return window.localStorage.getItem("auth_token")
}

export const setAuthenticationToken = (token) => {
  return window.localStorage.setItem("auth_token", token)
}

export const removeAuthenticationToken = () => {
  return window.localStorage.removeItem("auth_token")
}

export const getDecodedToken = () => {
  if (getAuthenticationToken() != null) {
    return jwtDecode(getAuthenticationToken())
  }
}

export const request = (method, url, data, options = {}) => {
  let headers = {}
  const token = getAuthenticationToken()

  if (token && token !== "null") {
    headers["Authorization"] = `Bearer ${token}`
  }

  return axios({
    method: method,
    credentials: "include",
    url: url,
    data: data,
    headers,
    ...options,
  })
}


axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    //daca response nu e athorizat, da redirect la login, adica daca tokenu e expirat
    if (error.response && error.response.status === 401) {
      //removeAuthenticationToken()
      //window.localStorage.removeItem("loginInfo")
      //puneti voi redirect pe pagina de login
      //--------------
      //window.location.href = `/login?message=${encodeURIComponent("Your authentication token has expired. Please login again!")}`
    }

    return Promise.reject(error)
  }
)

