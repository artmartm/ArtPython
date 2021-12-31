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
                                <li><Link to='/'>home</Link></li>
                                <li><Link to='/tournament'>tournament</Link></li>
                                <li><Link to='/players'>players</Link></li>
                                <li><Link to='/stadiums'>stadiums</Link></li>
                                <li><Link to='/games-list'>list of games</Link></li>
                                {authTokens ?
                                    <>
                                        <li><Link to='/dashboard'>dashboard</Link></li>
                                        <li onClick={logoutUser}><Link>logout</Link></li>
                                    </>
                                    :
                                    <>
                                        <li><Link to='/signup'>registration</Link></li>
                                        <li><Link to="/login" >login</Link></li>
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