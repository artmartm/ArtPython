import React, { useContext } from "react";
import AuthContext from "./authContext";

const LoginPage =() => {
    let {loginUser} = useContext(AuthContext)
    return(
        <div>
            <form onSubmit={loginUser}>
                <input type='text' name='username' placeholder='enter u'/>
                <input type='password' name='password' placeholder='enter p'/>
                <input type='submit'/>

            </form>
        </div>
    )
}
export default LoginPage;