import React from 'react'

function FormError(props) {
    if (props.message) {
        return (
            <div className='error'>{props.message}</div>
        )
    }
    return <> </>
}

export default FormError
