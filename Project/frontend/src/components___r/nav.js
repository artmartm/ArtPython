import React, { useState } from 'react';
import {Link} from 'react-router-dom';
function Nav() {
    const NavSt = {
        color: 'black',
        textDecoration: 'none'
    }
    const [change,setState] = useState(false);
    const NavSt2 = {
        color: 'red',
        textDecoration: 'none'
    }
    return(
        <nav>
            <h3>logo</h3>
            <ul className='nav-links'>
                <Link to='/about' style={change ? NavSt2 : NavSt} onMouseOver={()=>{setState(true)}} onMouseOut={()=>{setState(false)}}>
                    <li>about</li>
                </Link>
                <Link to='/team' style={change ? NavSt2 : NavSt} onMouseOver={()=>{setState(true)}} onMouseOut={()=>{setState(false)}}>
                    <li>teams</li>
                </Link>
                <Link to='/leagues' style={change ? NavSt2 : NavSt} onMouseOver={()=>{setState(true)}} onMouseOut={()=>{setState(false)}}>
                                        <li>leagues</li>
                </Link>
                <Link to='/' style={change ? NavSt2 : NavSt} onMouseOver={()=>{setState(true)}} onMouseOut={()=>{setState(false)}}> 
                                   <li>home</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;