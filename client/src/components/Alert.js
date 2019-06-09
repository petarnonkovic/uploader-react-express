import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ message, setMessage }) => {
    const msg = message.split(':')
    const cardClass = `card alert alert-${msg[0]}`
    return (
        <div className={cardClass}>
            <div className='card-content flow-text center-align'>{msg[1]}</div>
            <button
                onClick={() => setMessage('')}
                className='close'
                type='button'
                data-dismiss='alert'
                aria-label='Close'
            >
                x
            </button>
        </div>
    )
}

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired
}

export default Alert
