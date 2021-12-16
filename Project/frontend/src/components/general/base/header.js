import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'
//import './../../css/general/general.css';

const users = {1:'Art',4:'kit'}

const Header = () => {
    let {user,authTokens, logoutUser} = useContext(AuthContext)
    //className={'just_class'}
    return (
        <div style={{ background:'gray' }}>
                    <p className={'just_p'}>hello</p>
                        {authTokens &&   <p>Hello !!!</p>}
            {authTokens ? <div>
                    <p  onClick={logoutUser}>Logout</p>
                    <Link to='/teams'><li>teams</li></Link>
                    <Link to='/users'><li>users</li></Link>

                    <Link to='/players'><li>players</li></Link>
                    <Link to='/leagues'><li>leagues</li></Link>
                <Link to='/'><li>home</li></Link>
                <Link to='/add-game'><li>add a game</li></Link>

                <Link to='/games-list'><li>list of games</li></Link>
                <Link to='/add-city'><li>add city</li></Link>
                <Link to='/add-country'><li>add country</li></Link>
                <Link to='/news'><li>news</li></Link>
                <Link to='/stadiums'><li>stadiums</li></Link>
                <Link to='/all-comments'><li>all comments</li></Link>
                 </div>
                 
            : (<div style={{  display: 'inline-block' }}>
                <Link to="/login" >Login</Link>
                <Link to='/about'><li>about</li></Link>
                <Link to='/reg'><li>registration</li></Link>               
                <Link to='/'><li>home</li></Link>
                </div>
            )}
           
        </div>
    )
}

export default Header