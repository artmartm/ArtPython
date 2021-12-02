import React, { useState } from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
function Nav() {
    return(
        <nav style={{ background:'gray' }}>
            <ul className='nav-links'>
                <Link to='/about'><li>about</li></Link>
                <Link to='/about'><li>comments</li></Link>
                <Link to='/registration'><li>registration</li></Link>
                <Link to='/news'><li>news</li></Link>
                <Link to='/teams'><li>teams</li></Link>
                <Link to='/players'><li>players</li></Link>
                <Link to='/leagues'><li>leagues</li></Link>
                <Link to='/add'><li>add</li></Link>
                <Link to='/stadiums'><li>stadiums</li></Link>
                <Link to='/'><li>home</li></Link>
            </ul>
        </nav>
    )
}

{/* 
    /,/.,/.,/.,
    const NavSt = {
        color: 'black',
        textDecoration: 'none'
    }
    const [change,setState] = useState(false);
    const NavSt2 = {
        color: 'red',
        textDecoration: 'none'
    }
    <Link to='/about' style={change ? NavSt2 : NavSt} onMouseOver={()=>{setState(true)}} onMouseOut={()=>{setState(false)}}>
                    <li>about</li>
                </Link>*/}

export default Nav;
