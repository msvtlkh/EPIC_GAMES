import { useSelector } from "react-redux"
import { selectIsAuthenticated } from "../../slice/userSlice"
import { useNavigate } from "react-router"
import { useEffect } from "react"

const NoAuthRoute = ({ element }: { element: JSX.Element }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const navigate = useNavigate()
  
    useEffect(() => {
      if (isAuthenticated) {
        navigate('/')
      }
    }, [isAuthenticated, navigate]);
  
    return element;
  }
  
export default NoAuthRoute