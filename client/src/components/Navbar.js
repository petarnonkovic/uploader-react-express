import React from 'react'

const Navbar = () => (
    <>
        <nav className='blue-grey darken-2'>
            <div className='container'>
                <div className='nav-wrapper'>
                    <a href='#!' onClick={e => e.preventDefault()} className='brand-logo center'>
                        File Uploader
                    </a>
                </div>
            </div>
        </nav>
    </>
)

export default Navbar
