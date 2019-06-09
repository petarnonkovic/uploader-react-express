import React from 'react'
import PropTypes from 'prop-types'
import ProgressBar from './ProgressBar'

const Uploader = ({ onFileChange, onFileSubmit, isDisabled, progress }) => {
    return (
        <div className='section'>
            <h4 className='center-align'>Uploader</h4>
            <form className='row' onSubmit={onFileSubmit}>
                <div className='col s12'>
                    <div className='file-field input-field mt-1'>
                        <div className='btn'>
                            <span>Browse</span>
                            <input
                                type='file'
                                onChange={onFileChange}
                                name='fileField'
                                id='fileField'
                            />
                        </div>
                        <div className='file-path-wrapper'>
                            <input type='text' className='file-path validate' />
                        </div>
                    </div>
                </div>

                <ProgressBar progress={progress} />

                <div className='col s12'>
                    <button
                        disabled={isDisabled}
                        className='btn waves-effect waves-light right mt-1'
                        type='submit'
                    >
                        Submit<i className='material-icons right'>send</i>
                    </button>
                </div>
            </form>
        </div>
    )
}

Uploader.propTypes = {
    onFileChange: PropTypes.func.isRequired,
    onFileSubmit: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    progress: PropTypes.number.isRequired
}

export default Uploader
