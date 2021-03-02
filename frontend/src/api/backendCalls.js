import axios from 'axios'
import { useDispatch } from 'react-redux'
import { asyncUpdateUserId } from '../state/slice'

const axiosWithAuth = () => {
    const token = localStorage.getItem('token')

    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

const register = (newUser) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/register`,newUser)
}

const login = (loginInfo) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`,loginInfo)

}

const checkToken = (userId)  => {
    return axiosWithAuth().get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/${userId}`)
}

export {
    axiosWithAuth,
    register,
    login,
    checkToken
}