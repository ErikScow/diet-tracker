import React, { useState } from 'react'
import * as yup from 'yup'

import FormOne from './FormOne'
import FormTwo from './FormTwo'

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
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ , "Password should be 6-16 characters, at least one a-z, one A-Z, one 0-9, and one special characer.")
        .required('Required'),
    activity_level: yup
        .number()
        .required('Required'),
    desired_loss_rate: yup
        .number()
        .required('Required'),
    manual_mode: yup
        .bool()
        .required('Required'),
    weight: yup
        .number()
        .required('Required'),
    gender: yup
        .string()
        .required('Required')
})

function Registration(props) {
    const [step, setStep] = useState(1)
    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: '',
        activity_level: 0,
        desired_loss_rate: 0,
        manual_mode: false,
        //all dates will be in the format yyyymmdd
        birth_date: 00000000,
        weight: 0,
        gender: ''
    })
    const [validationErrors, setValidationErrors] = useState({})
    const [apiErrorMessage, setApiErrorMessage] = useState('')

    const nextStep = () => {
        setStep(step++)
    }

    const prevStep = () => {
        setStep(step--)
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
            })
            .catch(notValid => {
                setValidationErrors({
                    ...validationErrors,
                    [e.target.name]: notValid.errors[0]
                })
            })
        setApiErrorMessage(null)
        setFields({
            ...fields,
            [e.target.name]: e.target.value,
        })
    }

    switch(step) {
        case 1:
            return(
                <FormOne 
                    nextStep={nextStep}
                    handleChange={handleChange}
                />
            )
        case 2:
            return(
                <FormTwo 
                    prevStep={prevStep}
                    handleChange={handleChange}
                />
            )
    }
}

export default Registration;