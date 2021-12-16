import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'
//import './../../../css/general/headers.css'
import './ex.css'
const users = {1:'Art',4:'kit'}

const Header = () => {
    let {user,authTokens, logoutUser} = useContext(AuthContext)
    //className={'just_class'}
    return (
        <div style={{ background:'gray' }}>
                    <div>
                        <div>
                        <div id="container">
                        <nav>
                            <ul>
                                <li><Link to='/teams'>teams</Link></li>
                                <li><Link to='/leagues'>leagues</Link></li>
                                <li><Link to='/players'>players</Link></li>
                                <li><Link to='/profiles'>profiles</Link></li>
                                <li><Link to='/users'>users</Link></li>
                                <li><Link to='/'>home</Link></li>
                                <li><Link to='/games-list'>list of games</Link></li>
                                <li><Link to='/add-city'>add city</Link></li>
                                <li><Link to='/add-country'>add country</Link></li>
                                <li><Link to='/news'>news</Link></li>
                                <li> <Link to='/all-comments'>all comments</Link></li>
                                <li><Link to="/login" >Login</Link></li>
                                <li><Link to='/about'>about</Link></li>
                                <li><Link to='/reg'>registration</Link></li>


                                <li><Link onClick={logoutUser}>logout</Link></li>
        
             

                            </ul>
                        </nav>
                    </div>
                        </div>
                    </div>
                    {authTokens && <p>Hello !!!</p>}

        </div>
    )
}

export default Header


//simple
{/*}
{authTokens &&   <p>Hello !!!</p>}
{authTokens ? 
<div>
        <p onClick={logoutUser}>Logout</p>  /////
        <Link to='/teams'><li>teams</li></Link>      ////////
        <Link to='/profiles'><li>profiles</li></Link> /////
        <Link to='/users'><li>users</li></Link>
        <Link to='/players'><li>players</li></Link> /////
        <Link to='/leagues'><li>leagues</li></Link> ////
        <Link to='/'><li>home</li></Link>    ////
        <Link to='/add-game'><li>add a game</li></Link>
        <Link to='/games-list'><li>list of games</li></Link>
        <Link to='/add-city'><li>add city</li></Link>
        <Link to='/add-country'><li>add country</li></Link>
        <Link to='/news'><li>news</li></Link>
        <Link to='/stadiums'><li>stadiums</li></Link>
        <Link to='/all-comments'><li>all comments</li></Link>
    </div> :
    <div style={{  display: 'inline-block' }}>
        <Link to="/login" >Login</Link>
        <Link to='/about'><li>about</li></Link>
        <Link to='/reg'><li>registration</li></Link>          
        <Link to='/'><li>home</li></Link>
    </div>
}
*/}

// another one
{/*
 <li><a href="#">WordPress</a>
                                <ul>
                                    <li><a href="#">Themes</a></li>
                                    <li><a href="#">Plugins</a></li>
                                    <li><a href="#">Tutorials</a></li>
                                </ul>        
                                </li>
                                <li><a href="#">Web Design</a>
                                <ul>
                                    <li><a href="#">Resources</a></li>
                                    <li><a href="#">Links</a></li>
                                    <li><a href="#">Tutorials</a>
                                    <ul>
                                        <li><a href="#">HTML/CSS</a></li>
                                        <li><a href="#">jQuery</a></li>
                                        <li><a href="#">Other</a>
                                            <ul>
                                                <li><a href="#">Stuff</a></li>
                                                <li><a href="#">Things</a></li>
                                                <li><a href="#">Other Stuff</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                    </li>
                                </ul>
                                </li>
                                <li><a href="#">Graphic Design</a></li>
                                <li><a href="#">Inspiration</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">About</a></li>
*/}