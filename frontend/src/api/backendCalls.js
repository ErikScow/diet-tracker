import axios from 'axios'

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
    })
    .catch(err => {
        console.error(err)
    })
}

const checkToken = (userId)  => {
    axiosWithAuth.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/${userId}`)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })
}

export {
    axiosWithAuth,
    register,
    login,
    checkToken
}