import React, { useContext } from "react";
import AuthContext from "../../general/base/AuthContext";

function Dashboard() {
    let {user,authTokens, logoutUser} = useContext(AuthContext)

    return(
        <div>
            <h1>Hello, {user.username}</h1>
            <h2>this is your dashboard</h2>
            <h2>{user.info.description}!</h2>
            <h2>{user.info.favorite_team}!</h2>
        </div>
    )
}

export default Dashboard;