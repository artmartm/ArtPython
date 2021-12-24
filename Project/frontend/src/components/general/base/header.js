import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'
import './ex.css'
const users = { 1: 'Art', 4: 'kit' }

const Header = () => {
    let { user, authTokens, logoutUser } = useContext(AuthContext)
    return (
        <div style={{ background: 'gray' }}>
            <div>
                <div>
                    <div id="container">
                        <nav>
                            <ul>
                                <li><Link to='/teams'>teams</Link></li>
                                <li><Link to='/players'>players</Link></li>
                                <li><Link to='/'>home</Link></li>
                                <li><Link to='/games-list'>list of games</Link></li>
                                <li><Link to='/tournament'>tournament</Link></li>
                                <li><Link to='/about'>about</Link></li>

                                {authTokens ?
                                    <>
                                        <li><Link to='/profiles'>profiles</Link></li>
                                        <li><Link to='/users'>users</Link></li>
                                        <li><Link to='/dashboard'>dashboard</Link></li>
                                        <li><Link onClick={logoutUser}>logout</Link></li>

                                    </>
                                    :
                                    <>
                                        <li><Link to='/signup'>registration</Link></li>
                                        <li><Link to="/login" >Login</Link></li>
                                    </>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header