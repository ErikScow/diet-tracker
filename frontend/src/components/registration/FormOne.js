import React, { useState } from 'react';

import { Container, FormGroup, InputLabel, TextField, FormHelperText, Button, Grid, Box} from '@material-ui/core'

function FormOne({ fields, handleChange, validationErrors, validationErrorsCheck, nextStep }) {

    return (
    <Grid container direction='row'>
        <Grid item xs={2} sm ={3} md={4} lg={5}></Grid>
        <Grid item container direction='column' xs={8} sm={6} md={4} lg={2}>
            <Box m={1}>
                <TextField
                    label='Name'
                    variant='outlined'
                    error={validationErrorsCheck.name}
                    helperText={validationErrors.name}
                    size='small'
                    fullWidth={true}
                    
                    name='name'
                    value={fields.name}
                    onChange={handleChange}
                />
            </Box>
            
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
            

            <Box m={1}>
                <Button variant='outlined' type='button' onClick={nextStep}>Next</Button>
            </Box>
                        
        </Grid>
        <Grid item xs={2} sm={3} md={4} lg={5}></Grid>
    </Grid>
        
    );
}

export default FormOne;