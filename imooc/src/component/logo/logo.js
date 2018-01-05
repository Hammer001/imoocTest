import React from 'react'
import logoImg from './logo.png'
import './logo.css'

class Logo extends React.Component {
    render() {
        return (
            <div className='logo-container'>
                <img src={logoImg} width='300px' alt=''/>
            </div>
        )
    }
}

export default Logo

