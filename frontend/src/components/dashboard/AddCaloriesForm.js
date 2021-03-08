import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { TextField, FormHelperText, Button, Grid, Box, LinearProgress, InputLabel, Typography, FormLabel } from '@material-ui/core'

import { updateUserCall, updateUserUpdateError } from '../../state/userSlice'
import { calculateBmr, calculateSuggestion } from '../../utils/calorieCalculations';
import { updateDayCall } from '../../state/dailySlice';
import { addCalorieEventCall } from '../../state/eventsSlice';


const validationSchema = yup.object().shape({
    note: yup
        .string()
        ,
    magnitude: yup
        .number()
        .typeError('Must be a number')
        .required('Required'),
})


const useStyles = makeStyles((theme) => ({
    formError: {
        padding: '0 15px'
    },
    button: {
        height: '50px',
        marginTop: '25px',
    },
    inputField: {
        margin: '15px',
    },
    topInputField: {
        marginBottom: '15px'
    },
    sectionLabel: {
        color: '#757575',
        textAlign: 'left',
        margin: '10px'
    }
  }));

function AddCaloriesForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    const userId = useSelector(state => state.userSlice.userInfo.id)
    const userInfo = useSelector(state => state.userSlice.userInfo)
    const date = useSelector(state => state.dailySlice.formattedDate)
    const calorie_total = useSelector(state => state.dailySlice.dailyInfo.calorie_total)

    const [fields, setFields] = useState({
        magnitude: '',
        note: '',
        positive: true
    })
    const [validationErrors, setValidationErrors] = useState({})
    const [validationErrorsCheck, setValidationErrorsCheck] = useState({})
    const [isValid, setIsValid] = useState(false)

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
        dispatch(updateUserUpdateError(null))
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
            const newTotal = Number(calorie_total) + Number(fields.magnitude)
            const newDateInfo = {
                calorie_total: newTotal
            }
            dispatch(addCalorieEventCall(userId, date, fields))
            dispatch(updateDayCall(userId, date, newDateInfo))
        }
                    
    }

    useEffect(() => {
        validationSchema.isValid(fields).then(isValid => {
            setIsValid(isValid)
        })
    }, [fields])

    return (
            <Grid container direction='row'>
                <Grid item xs={1} sm ={2}></Grid>
                <Grid item container direction='column' xs={10} sm={8} md={12} lg={12}>
                    <Box m={1}>
                        <Typography className={classes.sectionLabel}>Add Meal (add calories)</Typography>
                        <Grid container direction='row' alignItems="stretch">

                            <Grid item container xs={8} sm={8} md={7} lg={6} >
                                    <TextField
                                        label='Note'
                                        variant='outlined'
                                        error={validationErrorsCheck.note}
                                        size='small'
                                        fullWidth={true}

                                        className={classes.topInputField}

                                        name='note'
                                        value={fields.note}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        label='Calories'
                                        variant='outlined'
                                        error={validationErrorsCheck.magnitude}
                                        helperText={validationErrors.magnitude}
                                        size='small'
                                        fullWidth={true}

                                        name='magnitude'
                                        value={fields.magnitude}
                                        onChange={handleChange}
                                    />
                            </Grid>
                            <Grid item xs={1} sm={2} md={2} lg={3}></Grid>
                            <Grid item container xs={3} sm={2} md={2} lg={2}>
                                <Button className={classes.button} variant='outlined' type='button' onClick={handleSubmit}>Add</Button>
                            </Grid>
                            <Grid item md={1} lg={1}></Grid>
                        </Grid>
                    </Box>
                    
                    {validationErrors.weight ? (<FormHelperText className={classes.formError} error>{validationErrors.weight}</FormHelperText>) : null}
                    {validationErrors.incomplete ? (<FormHelperText className={classes.formError} error>{validationErrors.incomplete}</FormHelperText>) : null}
                    
                                
                </Grid>
                <Grid item xs={1} sm={2} ></Grid>
            </Grid>
    
        
    );
}

export default AddCaloriesForm