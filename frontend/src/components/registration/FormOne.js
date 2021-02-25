import React from 'react';

function FormOne({ handleChange, validationErrors, nextStep }) {

    return (
        <form>
            <label>
                Name
                <input 
                    type='text'
                    name='name'
                    onChange={handleChange}
                />
                {validationErrors.name ? (<p className="form-error">{validationErrors.name}</p>) : null}
            </label>
            <label>
                Email
                <input 
                    type='text'
                    name='email'
                    onChange={handleChange}
                />
                {validationErrors.email ? (<p className="form-error">{validationErrors.email}</p>) : null}
            </label>
            <label>
                Password
                <input 
                    type='password'
                    name='password'
                    onChange={handleChange}
                />
                {validationErrors.password ? (<p className="form-error">{validationErrors.password}</p>) : null}
            </label>
            <button type='button' onClick={nextStep}>Next</button>
        </form>
    );
}

export default FormOne;