import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from './AuthContext'

const Header = () => {
    let {authTokens, logoutUser} = useContext(AuthContext)
    return (
        <div>
            <h1>hghjhjhj</h1>
            <Link to="/" >Home</Link>
            <span> | </span>
            {authTokens ? (
                 <p  onClick={logoutUser}>Logout</p>
            ): (
                <Link to="/login" >Login</Link>
            )}
           
            {<p>Hello world</p>}
           
        </div>
    )
}

export default Header