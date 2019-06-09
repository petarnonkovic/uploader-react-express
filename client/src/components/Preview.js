import React from 'react'
import PropTypes from 'prop-types'

const Preview = ({ preview }) => {
    return (
        <div className='section'>
            <h4 className='center-align'>Preview</h4>
            <div className='valign-wrapper mt-1 preview'>
                {!preview ? (
                    <p>Image Preview</p>
                ) : (
                    <img className='responsive-img' src={preview} alt='Upload Preview' />
                )}
            </div>
        </div>
    )
}

Preview.propTypes = {
    preview: PropTypes.string
}

export default Preview
