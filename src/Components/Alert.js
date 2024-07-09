import React from 'react'

function Alert(props) {
    return (
        <div className='container my-3'>
            <div className="alert alert-info" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert
