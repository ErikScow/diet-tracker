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
    axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/register`,newUser)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })
}

const login = (loginInfo) => {
    axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`,loginInfo)
    .then(res => {
        console.log(res)
        useDispatch()(asyncUpdateUserId(res.data.id))
    })
    .catch(err => {
        console.error(err)
    })
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