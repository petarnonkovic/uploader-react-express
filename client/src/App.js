import React from 'react'
import Navbar from './components/Navbar'
import MainContent from './components/MainContent'

const App = () => {
    return (
        <div className='App'>
            {/* App NavBar */}
            <header>
                <Navbar />
            </header>
            {/* Main Content */}
            <main className='container main-content'>
                <MainContent />
            </main>
            {/* App Footer */}
            <footer className='page-footer blue-grey darken-2'>
                <p className='center-align'>Built with React &amp; Express; by &copy;petar</p>
            </footer>
        </div>
    )
}

export default App
