import React from 'react'

function Alert(props) {
    return (
        <>
            <div className='container' style={{ height: '15px' }}>
                {props.alert &&
                    <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                        {/*<strong>Holy guacamole!</strong> You should check in on some of those fields below.*/}
                        <strong>{props.alert.msg}</strong>
                        {/*<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>*/}
                    </div>
                }
            </div>
        </>
    )
}

export default Alert
