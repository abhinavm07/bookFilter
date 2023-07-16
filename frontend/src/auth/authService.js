import axios from 'axios'

const API_URL = '/api/users/'

//Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//profile
const getProfile = async (token) => {
  const response = await axios.get(API_URL, token)

  return response.data
}

//Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const forgotPassword = async(email) => {
    const response = await axios.post(API_URL + 'resetPassword', email)
    return response.data
}

const authService = {
  register,
  login,
  logout,
  forgotPassword
}

export default authService
