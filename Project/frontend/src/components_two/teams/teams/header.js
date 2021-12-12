import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'

const Header = () => {
    let {user,authTokens, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <Link to="/" >Home</Link>
            <Link to='/teams'>teams</Link>

            <span> | </span>
            {authTokens ? (
                 <p  onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}
           
            {authTokens &&   <p>Hello !!!</p>}
        </div>
    )
}

export default Header