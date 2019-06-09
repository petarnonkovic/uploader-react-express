import React from 'react'
import PropTypes from 'prop-types'

const Gallery = ({ images }) => {
    const imageCollection = images.map((img, idx) => {
        let imgName = img.split('/')[2]
        imgName = imgName.substring(0, imgName.indexOf('.'))
        return (
            <div className='col s12 m4 l3 gallery-item' key={idx}>
                <div className='card-panel small center-align'>
                    <div className='card-image'>
                        <img height='96px' src={img} alt={imgName} className='img-responsive' />
                    </div>
                    <div className='card-content'>
                        <p>{imgName}</p>
                    </div>
                </div>
            </div>
        )
    })
    return <>{imageCollection}</>
}

Gallery.propTypes = {
    images: PropTypes.array.isRequired
}

export default Gallery
