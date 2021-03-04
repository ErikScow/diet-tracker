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

//user and authentication api calls
const register = (newUser) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/register`,newUser)
}
const login = (loginInfo) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`,loginInfo)
}
const checkToken = (userId)  => {
    return axiosWithAuth().get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/${userId}`)
}
const updateUser = (userId, updateInfo) => {
    return axiosWithAuth().put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}`, updateInfo)
}

//daily data api calls
const getAllDailyData = (userId) => {
    return axiosWithAuth().get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}/daily`)
}
const getToday = (userId, formattedDate) => {
    return axiosWithAuth().get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}/daily/${formattedDate}`)
}
const createDay = (userId, dayData) => {
    return axiosWithAuth().post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}/daily`, dayData)
}
const updateDay = (userId, formattedDate, updateInfo) => {
    return axiosWithAuth().put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}/daily/${formattedDate}`, updateInfo)
}

//calorie events api calls
const getCalorieEvents = (userId, formattedDate) => {
    return axiosWithAuth().get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}/daily/${formattedDate}/events`)
}
const addCalorieEvent = (userId, formattedDate, eventData) => {
    return axiosWithAuth().post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}/daily/${formattedDate}/events`, eventData)
}
const deleteCalorieEvent = (userId, formattedDate, eventId) => {
    return axiosWithAuth().delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/${userId}/daily/${formattedDate}/events/${eventId}`)
}


export {
    axiosWithAuth,
    register,
    login,
    checkToken,
    updateUser,
    getAllDailyData,
    getToday,
    createDay,
    updateDay,
    getCalorieEvents,
    addCalorieEvent,
    deleteCalorieEvent
}