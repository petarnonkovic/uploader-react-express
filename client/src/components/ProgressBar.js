import React from 'react'
import PropTypes from 'prop-types'

const ProgressBar = ({ progress }) => (
    <div className='progress'>
        <div className='determinate' style={{ width: `${progress}%` }} />
    </div>
)

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired
}

export default ProgressBar
