import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Nav from '../common/Nav'
import FormOne from './FormOne'
import FormTwo from './FormTwo'

import { login, register } from '../../api/backendCalls'
import { formatDateFromForm } from '../../utils/dateFormatting'
import { asyncUpdateUserId } from '../../state/slice'

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required('Required'),
    email: yup
        .string()
        .email('Must be a valid email address')
        .required('Required'),
    password: yup
        .string()
        .required('Required')
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ , "Password should be 6-16 characters, at least one a-z, one A-Z, one 0-9, and one special characer.")
        ,
    activity_level: yup
        .number('Required')
        .required('Required'),
    desired_loss_rate: yup
        .number()
        .required('Required'),
    manual_mode: yup
        .bool()
        .required('Required'),
    weight: yup
        .number()
        .typeError('Must be a number')
        .required('Required'),
    gender: yup
        .string()
        .required('Required'),
    birth_date: yup
        .string()
        .required('Required')
    
})

function Registration(props) {
    
    const history = useHistory()
    const dispatch = useDispatch()

    const [step, setStep] = useState(1)
    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: '',
        activity_level: '',
        desired_loss_rate: '',
        manual_mode: false,
        birth_date: '2000-01-01',
        weight: '',
        gender: ''
    })

    const [validationErrors, setValidationErrors] = useState({})
    const [validationErrorsCheck, setValidationErrorsCheck] = useState({})
    const [isValid, setIsValid] = useState(false)
    const [apiErrorMessage, setApiErrorMessage] = useState('')

    const nextStep = () => {
        setStep(step + 1)
    }

    const prevStep = () => {
        setStep(step - 1)
    }

    const handleChange = (e) => {
        e.persist()
        yup
            .reach(validationSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setValidationErrors({
                    ...validationErrors,
                    [e.target.name]: null
                })
                setValidationErrorsCheck({
                    ...validationErrorsCheck,
                    [e.target.name]: false
                })
            })
            .catch(notValid => {
                setValidationErrors({
                    ...validationErrors,
                    [e.target.name]: notValid.errors[0]
                })
                setValidationErrorsCheck({
                    ...validationErrorsCheck,
                    [e.target.name]: true
                })
            })
        setApiErrorMessage(null)
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const formattedDate = formatDateFromForm(fields.birth_date)
        const dataToSubmit = { ...fields, birth_date: formattedDate}

        if (!isValid){
            setValidationErrors({
                ...validationErrors,
                incomplete: "Please complete all of the required fields to submit!"
            })
        } else {
            setValidationErrors({
                ...validationErrors,
                incomplete: null
            })
            register(dataToSubmit)
                .then(res => {
                    login({ email: fields.email, password: fields.password})
                        .then(res => {
                            localStorage.setItem('token', res.data.token)
                            dispatch(asyncUpdateUserId(res.data.id))
                            history.push('/dashboard')
                        })
                        .catch(err => {
                            if (err.message){
                                setApiErrorMessage(err.response.data.message)
                            } else {
                                setApiErrorMessage("Network Error")
                            }
                        })
                    
                })
                .catch(err => {
                    if (err.message){
                        setApiErrorMessage(err.response.data.message)
                    } else {
                        setApiErrorMessage("Network Error")
                    }
                })
        }
        
    }

    useEffect(() => {
        validationSchema.isValid(fields).then(isValid => {
            setIsValid(isValid)
        })
    }, [fields])

    switch(step) {
        case 1:
            return(
                <div>
                    <Nav />
                    <FormOne 
                        fields={fields}
                        nextStep={nextStep}
                        handleChange={handleChange}
                        validationErrors={validationErrors}
                        validationErrorsCheck={validationErrorsCheck}
                    />
                </div>
                
            )
        case 2:
            return(
                <div>
                    <Nav />
                    <FormTwo 
                        fields={fields}
                        prevStep={prevStep}
                        handleChange={handleChange}
                        validationErrors={validationErrors}
                        validationErrorsCheck={validationErrorsCheck}
                        isValid={isValid}
                        handleSubmit={handleSubmit}
                        apiErrorMessage={apiErrorMessage}
                    />
                </div>
            )
    }
}

export default Registration;