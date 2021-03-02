import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { Container, FormGroup, InputLabel, TextField, FormHelperText, Button, Grid, Box} from '@material-ui/core'

import { login } from '../../api/backendCalls'
import { asyncUpdateUserId } from '../../state/slice'

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .required('Required'),
    password: yup
        .string()
        .required('Required')
})

const useStyles = makeStyles((theme) => ({
    formError: {
        padding: '0 15px'
    }
  }));

function Login() {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const [validationErrors, setValidationErrors] = useState({})
    const [validationErrorsCheck, setValidationErrorsCheck] = useState({})
    const [isValid, setIsValid] = useState(false)
    const [apiErrorMessage, setApiErrorMessage] = useState('')

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
            console.log(fields)
            axios
                .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/login`,fields)
                .then(res => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token)
                    dispatch(asyncUpdateUserId(res.data.id))
                    history.push('/dashboard')
                })
                .catch(err => {
                    console.error(err)
                })
                    }
                    
                }

    useEffect(() => {
        validationSchema.isValid(fields).then(isValid => {
            setIsValid(isValid)
        })
    }, [fields])

    return (
    <Grid container direction='row'>
        <Grid item xs={2} sm ={3} md={4} lg={5}></Grid>
        <Grid item container direction='column' xs={8} sm={6} md={4} lg={2}>
            
            <Box m={1}>
                <TextField 
                    label='Email'
                    variant='outlined'
                    error={validationErrorsCheck.email}
                    helperText={validationErrors.email}
                    size='small'
                    fullWidth={true}

                    name='email'
                    value={fields.email}
                    onChange={handleChange}
                />
            </Box>
            
            <Box m={1}>
                <TextField 
                    label='Password'
                    variant='outlined'
                    error={validationErrorsCheck.password}
                    helperText={validationErrors.password}
                    size='small'
                    fullWidth={true}

                    type='password'
                    name='password'
                    value={fields.password}
                    onChange={handleChange}
                />
            </Box>
            
            {validationErrors.incomplete ? (<FormHelperText className={classes.formError} error>{validationErrors.incomplete}</FormHelperText>) : null}
            {apiErrorMessage ? (<FormHelperText className={classes.formError} error>{apiErrorMessage}</FormHelperText>) : null}
            <Box m={1}>
                <Button variant='outlined' type='button' onClick={handleSubmit}>Login</Button>
            </Box>
                        
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={5}></Grid>
    </Grid>
        
    );
}

export default Login