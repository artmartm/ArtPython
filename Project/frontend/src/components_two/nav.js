import React, { useState } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
function Nav() {
    return(
        <nav style={{ background:'gray' }}>
            <ul className='nav-links'>
                <Link to='/about'><li>about</li></Link>
                <Link to='/add-comment'><li>add a comment</li></Link>
                <Link to='/reg'><li>registration</li></Link>
                <Link to='/login'><li>login</li></Link>
                <Link to='/add-country'><li>add country</li></Link>
                <Link to='/add-city'><li>add city</li></Link>
                <Link to='/comments'><li>comments</li></Link>
                <Link to='/news'><li>news</li></Link>
                <Link to='/teams'><li>teams</li></Link>
                <Link to='/players'><li>players</li></Link>
                <Link to='/leagues'><li>leagues</li></Link>
                <Link to='/stadiums'><li>stadiums</li></Link>
                <Link to='/'><li>home</li></Link>
            </ul>
        </nav>
    )
}


export default Nav;
