import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return(
        <div className ="ui inverted  menu">
            <Link style={{fontSize: '10x'}}to="/" className='item'>
                StreamExpert
            </Link>
            <div className='right menu'>
                <Link to='/' className='item'>
                    All Streams
                </Link>
                <GoogleAuth />
            </div> 
        </div>
    );
};


export default Header;