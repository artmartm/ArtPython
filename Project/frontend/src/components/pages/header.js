import React, { useContext } from "react";
import {Link} from 'react-router-dom';
import AuthContext from "./authContext";

const HeaderS=()=> {
    let {user, logoutUser} = useContext(AuthContext)
    return(
        <div>
            <Link to='/'>Home</Link>
            <span>|</span>
            {user ? (<>
                <p onClick={logoutUser}>logout</p>
                <h1>hello {user.username}</h1>
                </>
            ):(
                <Link to='/login'>login</Link>
            )}

            {user && <p>hello {user.username}</p>}
            
        </div>
    )
}
export default HeaderS;