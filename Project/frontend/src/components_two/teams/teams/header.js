import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'

const Header = () => {
    let {user,authTokens, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to='/teams'>teams</Link>
            <span> | </span>
            {authTokens ? (
                 <p  onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}
           
            {authTokens &&   <p>Hello !!!</p>}
            <Link to='/about'><li>about</li></Link>
                <Link to='/login-2'><li>login2</li></Link>
                <Link to='/add-game'><li>add a game</li></Link>
                <Link to='/games-list'><li>list of games</li></Link>
                <Link to='/reg'><li>registration</li></Link>
                <Link to='/add-country'><li>add country</li></Link>
                <Link to='/add-city'><li>add city</li></Link>
                <Link to='/news'><li>news</li></Link>
                <Link to='/teams'><li>teams</li></Link>
                <Link to='/players'><li>players</li></Link>
                <Link to='/leagues'><li>leagues</li></Link>
                <Link to='/stadiums'><li>stadiums</li></Link>
                <Link to='/'><li>home</li></Link>
        </div>
    )
}

export default Header