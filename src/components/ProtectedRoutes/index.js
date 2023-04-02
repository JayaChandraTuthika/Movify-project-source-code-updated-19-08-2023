
import Cookies from "js-cookie"
import { Navigate,Outlet} from "react-router-dom"

const ProtectedRoutes = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined){
        return <Navigate to='/login' replace={true}/>
    }
    return <Outlet/>
}

export default ProtectedRoutes