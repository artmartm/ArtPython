import React, { useContext } from 'react'
import AuthContext from '../../general/base/AuthContext'

const SuccessfulLogIn = () => {
    let { user, authTokens, logoutUser } = useContext(AuthContext)
    return (
        <div>
            <div>
                <div>
                    <div id="container">
                        {authTokens ?
                            <h1>Hello, {user.username} you were logged in successfully!</h1>
                            :
                            <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessfulLogIn;