import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import { TextField, FormHelperText, Button, Grid, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import { updateUserCall, updateUserUpdateError } from '../../state/userSlice'
import { calculateBmr, calculateSuggestion } from '../../utils/calorieCalculations';
import { updateDayCall } from '../../state/dailySlice';

const validationSchema = yup.object().shape({
    desired_loss_rate: yup
    .number()
    .required('Required'),
})

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        width: '200px'
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      select: {
          textAlign: 'left',
      },
      selectOption: {
          textAlign: 'left',
          whiteSpace: 'normal'
      },
      formError: {
          padding: '0 15px'
      },
      formUpdated: {
          padding: '0 10px',
          color: 'limegreen'
      }
  }));

function DesiredLossForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()

    const userId = useSelector(state => state.userSlice.userInfo.id)
    const userInfo = useSelector(state => state.userSlice.userInfo)
    const date = useSelector(state => state.dailySlice.formattedDate)

    const [fields, setFields] = useState({
        desired_loss_rate: ''
    })
    const [validationErrors, setValidationErrors] = useState({})
    const [validationErrorsCheck, setValidationErrorsCheck] = useState({})
    const [incomplete, setIncomplete] = useState(null)
    const [invalidDesired, setInvalidDesired] = useState(null)
    const [isValid, setIsValid] = useState(false)
    const [updatedMessage, setUpdatedMessage] = useState(null)

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
        setUpdatedMessage(null)
    }

    const handleSubmit = e => {
        e.preventDefault()

        

        if(!isValid){
            setIncomplete('Please complete all of the required fields to submit!')
        } else {
            const bmr = calculateBmr(userInfo.gender, userInfo.weight, userInfo.height, userInfo.age)
            const calorieSuggestion = calculateSuggestion(bmr, userInfo.activity_level, fields.desired_loss_rate)
            if (calorieSuggestion < 1000){
                setInvalidDesired("Your desired loss rate is too high for your weight and activity level and will result in a calorie suggestion below 1000 calories per day, which is considered unhealthy. Please select a lower rate to have a healthier calorie suggestion.")
            } else {
                const newDateInfo = {
                    desired_loss_rate: fields.desired_loss_rate,
                    bmr: bmr,
                    calorie_suggestion: calorieSuggestion
                }
                dispatch(updateUserCall(userId, fields))
                dispatch(updateDayCall(userId, date, newDateInfo))
                setFields({
                    desired_loss_rate: ''
                })
                setUpdatedMessage('Updated!')
                setInvalidDesired(null)
            }
            setIncomplete(null)
        }

        
                    
    }

    useEffect(() => {
        validationSchema.isValid(fields).then(isValid => {
            setIsValid(isValid)
        })
    }, [fields])

    return (
        <div>
            <Grid container direction='row'>
                <Grid item xs={1} sm ={2} md={4} lg={4}></Grid>
                <Grid item container direction='column' xs={10} sm={8} md={4} lg={4}>
                    <Box m={1}>
                        <Grid container direction='row' alignItems='stretch'>
                            <Grid item container xs={8} sm={8} md={7} lg={6}>
                                <FormControl 
                                    variant='outlined' 
                                    size='small'
                                    fullWidth={true}

                                    className={classes.formControl} 
                                >
                                    <InputLabel id="desired_loss_rate">Desired Loss</InputLabel>
                                    <Select
                                        labelId='desired_loss_rate'
                                        label='Desired Loss'

                                        className={classes.select}
                                        name='desired_loss_rate'
                                        id='desired_loss_rate'
                                        value={fields.desired_loss_rate}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={0} className={classes.selectOption}>0.0 lbs/week (maintainance)</MenuItem>
                                        <MenuItem value={0.5} className={classes.selectOption}>0.5 lbs/week</MenuItem>
                                        <MenuItem value={1} className={classes.selectOption}>1.0 lbs/week</MenuItem>
                                        <MenuItem value={1.5} className={classes.selectOption}>1.5 lbs/week</MenuItem>
                                        <MenuItem value={2} className={classes.selectOption}>2.0 lbs/week</MenuItem>
                                        <MenuItem value={2.5} className={classes.selectOption}>2.5 lbs/week</MenuItem>
                                    </Select>
                                </FormControl>
                                </Grid>
                                <Grid item xs={1} sm={1} md={3} lg={4}></Grid>
                                <Grid item container xs={3} sm={3} md={2} lg={2}>
                                    <Button variant='outlined' type='button' onClick={handleSubmit}>Update</Button>
                                    {updatedMessage ? <FormHelperText className={classes.formUpdated}>{updatedMessage}</FormHelperText> : null}
                                </Grid>
                            </Grid>
                        </Box>
                    
                    {validationErrors.desired_loss_rate ? (<FormHelperText className={classes.formError} error>{validationErrors.desired_loss_rate}</FormHelperText>) : null}
                    {incomplete ? (<FormHelperText className={classes.formError} error>{incomplete}</FormHelperText>) : null}
                    {invalidDesired ? (<FormHelperText className={classes.formError} error>{invalidDesired}</FormHelperText>) : null}
                    
                                
                </Grid>
                <Grid item xs={1} sm ={2} md={4} lg={4}></Grid>
            </Grid>
        </div>
    
        
    );
}

export default DesiredLossForm