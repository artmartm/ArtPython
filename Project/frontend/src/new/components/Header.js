import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const us = ['','Art'];

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext);
    return (
        <div>
            <Link to="/" >Home</Link>
            <span> | </span>
            {user ? (
                 <p  onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}
           
            {user && <p>Hello <Link to={{ pathname: `/players/${user.user_id}/`, fromDashboard: false}}>{us[user.user_id]}</Link></p>}
           
        </div>
    )
}

export default Header
