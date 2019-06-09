import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Alert from './Alert'
import Uploader from './Uploader'
import Preview from './Preview'
import Gallery from './Gallery'
window.URL = window.URL || window.webkitURL

const MainContent = () => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState('')
    const [fileSize, setFileSize] = useState(0)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState('')

    const [images, setImages] = useState([])
    useEffect(() => {
        loadImages()
    }, [])

    const loadImages = () => {
        axios
            .get('http://localhost:5000/file-list')
            .then(res => {
                if (res.data.files.length > 0) {
                    setImages(res.data.files)
                }
            })
            .catch(error => {
                if (error.response) {
                    setMessage(`danger:${error.response.data.message}`)
                }
            })
    }

    const checkFileSize = size => {
        size = size / 1024 / 1024
        return size.toFixed(2) > 2 ? false : true
    }

    const resetFileState = () => {
        setFile('')
        setFileName('')
        setMessage('')
    }

    const onFileChange = e => {
        const selectedFile = e.target.files[0]
        // validate file
        if (!/\/(jpe?g|png|gif)$/.test(selectedFile.type)) {
            setMessage('danger:Not supported image type')
            setTimeout(() => {
                setMessage('')
            }, 5000)
            return
        }

        if (!checkFileSize(selectedFile.size)) {
            setMessage('danger:Image too large')
            setTimeout(() => {
                setMessage('')
            }, 5000)
            return
        }

        // load file
        const reader = new FileReader()
        const urlObjectUrl = window.URL.createObjectURL(selectedFile)
        setFile(urlObjectUrl)
        setFileSize(selectedFile.size)
        setFileName(selectedFile.name)
        reader.addEventListener('load', () => {
            setFile(reader.result)
            setIsDisabled(false)
            window.URL.revokeObjectURL(urlObjectUrl)
        })
        reader.readAsDataURL(selectedFile)
    }

    const onFileSubmit = e => {
        e.preventDefault()

        axios
            .post(
                'http://localhost:5000/upload',
                { file, fileName, fileSize },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    onUploadProgress: function(progressEvent) {
                        setProgress(Math.round(progressEvent.loaded * 100) / progressEvent.total)
                        if (progressEvent.loaded === progressEvent.total) {
                            setTimeout(() => setProgress(0), 5000)
                        }
                    }
                }
            )
            .then(res => {
                // reset state variables
                setTimeout(() => resetFileState(), 5000)
                // disable button until next file
                setIsDisabled(true)
                setMessage('success:Image Uploaded!')
                loadImages()
            })
            .catch(error => {
                if (error.response) {
                    setMessage(`danger:${error.response.data.message}`)
                } else if (error.request) {
                    setMessage('danger:Service Unavailable. Try again.')
                    console.log('Req: ', error.request)
                } else {
                    setMessage(`danger:${error.message}`)
                    console.log('Error: ', error.message)
                }
                // reset state variables
                setTimeout(() => resetFileState(), 5000)
                setIsDisabled(true)
            })
    }

    return (
        <>
            <div className='row'>
                <div className='col m2 hide-on-small-only' />
                <div className='col s12 m8'>
                    {!!message ? <Alert message={message} setMessage={setMessage} /> : null}
                </div>
                <div className='col s12 m6'>
                    <Preview preview={file} />
                </div>
                <div className='col s12 m6'>
                    <Uploader
                        isDisabled={isDisabled}
                        onFileChange={onFileChange}
                        onFileSubmit={onFileSubmit}
                        progress={progress}
                    />
                </div>
            </div>
            <div className='row'>
                {images.length > 0 ? (
                    <Gallery images={images} />
                ) : (
                    <div className='col s12'>
                        <p className='center-align flow-text teal-text z-depth-1 py-1'>
                            Image Gallery is empty!
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default MainContent
