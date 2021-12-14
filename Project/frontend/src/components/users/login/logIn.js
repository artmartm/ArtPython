import React, {useContext} from 'react'
import AuthContext from '../../general/base/AuthContext'
import './login.css'
const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={loginUser}>
            <div class="main-signin">
		<div class="main-signin__head">
			<p>LOGIN</p>
		</div>
		<div class="main-signin__middle">
			<div class="middle__form">
            <input type="text" name="username" placeholder="Enter Username" />
            <input type="password" name="password" placeholder="Enter Password" />
            <input type="submit" placeholder="login"/>
			</div>
		</div>
		<div class="main-signin__foot">
			<div class="foot__left">
				<p>through:</p>
			</div>
			<div class="foot__right">
				<div class="twit"><a href="#"></a></div>
				<div class="face"><a href="#"></a></div>
			</div>
		</div>
	</div>
            </form>
        </div>
    )
}

export default LoginPage
