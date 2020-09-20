import React from 'react';
import './FormError.css';
import PropTypes from 'prop-types';

function FormError(props) {
    if (props.message) {
        return (
            <div className='error'>{props.message}</div>
        )
    }
    return <> </>
}

export default FormError

FormError.propTypes = {
    message: PropTypes.string
}
