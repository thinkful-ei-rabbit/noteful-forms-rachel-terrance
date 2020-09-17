import React from 'react';
import './FormError.css'

function FormError(props) {
    if (props.message) {
        return (
            <div className='error'>{props.message}</div>
        )
    }
    return <> </>
}

export default FormError
