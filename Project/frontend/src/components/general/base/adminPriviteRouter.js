import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from './AuthContext'

const AdminPrivateRoute = ({ children, ...rest }) => {
    let { authTokens } = useContext(AuthContext)
    return (
        <Route {...rest}>{!authTokens ? <Redirect to="/login" /> : children}</Route>
    )
}

export default AdminPrivateRoute;