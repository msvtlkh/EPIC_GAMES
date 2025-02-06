import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { selectIsAuthenticated } from "../../slice/userSlice"
import { useEffect } from "react"

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/')
      }
    }, [isAuthenticated, navigate]);

    return element 
}

export default ProtectedRoute