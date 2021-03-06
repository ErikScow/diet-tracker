import React from 'react';

import { makeStyles } from '@material-ui/core/styles'

import { TextField, Select, MenuItem, Button, Grid, Box, InputLabel, FormHelperText, FormControl, LinearProgress} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
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
    heightLabel: {
        width: '30%',
        paddingTop: '15px',
        paddingLeft: '25px'
    },
    heightContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    heightField: {
        width: '40%',
        paddingRight: '10px'
    }
  }));

function FormTwo({ fields, handleChange, validationErrors, validationErrorsCheck, prevStep, isValid, handleSubmit, apiErrorMessage, registerLoading }) {

    const classes = useStyles()

    return (
    <Grid container direction='row'>
        <Grid item xs={2} sm ={3} md={4} lg={5}></Grid>
        <Grid item container direction='column' xs={8} sm={6} md={4} lg={2}>
            <FormControl 
                variant='outlined' 
                size='small'
                fullWidth={true}

                className={classes.formControl} 
            >
                <InputLabel id="activity_level">Activity Level</InputLabel>
                <Select
                    labelId='activity_level'
                    label='Activity Level'

                    className={classes.select}
                    name='activity_level'
                    id='activity_level'
                    value={fields.activity_level}
                    onChange={handleChange}
                >
                    <MenuItem value={1} className={classes.selectOption}>Sedentary</MenuItem>
                    <MenuItem value={2} className={classes.selectOption}>Daily Walking</MenuItem>
                    <MenuItem value={3} className={classes.selectOption}>Exercise 3 times a week</MenuItem>
                    <MenuItem value={4} className={classes.selectOption}>Excercise 5 times a week</MenuItem>
                    <MenuItem value={5} className={classes.selectOption}>Active Job and exercisb and exercisb and sdfgsdfgsdfgsdfgsfgexercisb and exercise</MenuItem>
                </Select>
                <FormHelperText>{validationErrors.activity_level}</FormHelperText>
            </FormControl>

            <FormControl 
                variant='outlined' 
                size='small'
                fullWidth={true}

                className={classes.formControl} 
            >
                <InputLabel id="desired_loss_rate">Desired Loss Rate</InputLabel>
                <Select
                    labelId='desired_loss_rate'
                    label='Desired Loss Rate'

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
                <FormHelperText>{validationErrors.desired_loss_rate}</FormHelperText>
            </FormControl>

            <FormControl 
                variant='outlined' 
                size='small'
                fullWidth={true}

                className={classes.formControl} 
            >
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                    labelId='gender'
                    label='gender'

                    className={classes.select}
                    name='gender'
                    id='gender'
                    value={fields.gender}
                    onChange={handleChange}
                >
                    <MenuItem value={'male'} className={classes.selectOption}>Male</MenuItem>
                    <MenuItem value={'female'} className={classes.selectOption}>Female</MenuItem>
                </Select>
                <FormHelperText>{validationErrors.desired_loss_rate}</FormHelperText>
            </FormControl>

            <Box m={1}>
                <TextField 
                    label='Weight (lbs)'
                    variant='outlined'
                    error={validationErrorsCheck.weight}
                    helperText={validationErrors.weight}
                    size='small'
                    fullWidth={true}

                    name='weight'
                    value={fields.weight}
                    onChange={handleChange}
                />
            </Box>

            
            <Box m={1}>
                <TextField 
                    label='Height (inches)'
                    variant='outlined'
                    error={validationErrorsCheck.height}
                    helperText={validationErrors.height}
                    size='small'
                    fullWidth={true}

                    name='height'
                    value={fields.height}
                    onChange={handleChange}
                />
            </Box>

            <Box m={1}>
                <TextField 
                    label='Birthday'
                    variant='outlined'
                    error={validationErrorsCheck.birth_date}
                    helperText={validationErrors.birth_date}
                    size='small'
                    fullWidth={true}
                    InputLabelProps={{
                        shrink: true,
                      }}

                    type='date'
                    name='birth_date'
                    value={fields.birth_date}
                    onChange={handleChange}
                />
            </Box>

            {validationErrors.incomplete ? (<FormHelperText className={classes.formError} error>{validationErrors.incomplete}</FormHelperText>) : null}
            {apiErrorMessage ? (<FormHelperText className={classes.formError} error>{apiErrorMessage}</FormHelperText>) : null}
            {registerLoading ? <LinearProgress /> : null}
            <Box m={1}>
                <Button variant='outlined' type='button' onClick={prevStep}>Back</Button>
                <Button variant='outlined' type='button' onClick={handleSubmit}>Done</Button>
            </Box>
                        
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={5}></Grid>
    </Grid>
        
    );
}

export default FormTwo;