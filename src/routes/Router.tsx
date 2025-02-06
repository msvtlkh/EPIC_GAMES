import { createBrowserRouter, RouterProvider } from "react-router"
import MainGamePageLayout from "../components/Layouts/MainGamePageLayout/MainGamePageLayout"
import LoginPage from "./pages/AuthPages/LoginPage/LoginPage"
import SignUp from "./pages/AuthPages/SignUp/SignUp"
import RecoverPasswordPage from "./pages/AuthPages/RecoverPasswordPage/RecoverPasswordPage"
import GamesListPage from "./pages/MainPages/GamesListPage/GamesListPage"
import LayoutAuthPage from "../components/Layouts/AuthPageLayout/LayoutAuth"
import AboutGame from "./pages/MainPages/AboutGame/AboutGame"
import ShoppingCart from "./pages/MainPages/ShoppingCart/ShoppingCart"
import WishList from "./pages/MainPages/WishList/WishList"
import AccountSettings from "./pages/MainPages/AccountSettings/AccountSettings"
import PersonalAccPage from "./pages/MainPages/PersonalAccPage/PersonalAccPage"
import NoAuthRoute from "./guards/NoAuthRoute"
import ProtectedRoute from "./guards/ProtectedRoute"

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <LayoutAuthPage/>,
        children: [
            {
                path: '',
                element: <NoAuthRoute element={<LoginPage/>}/> 
            },
            {
                path: 'sign-up',
                element: <NoAuthRoute element={<SignUp/>}/> 
            },
            {
                path: 'recover-password',
                element: <NoAuthRoute element={<RecoverPasswordPage/>}/>
            }
        ]
    },
    {
        path: '',
        element: <MainGamePageLayout/>,
        children: [
            {
                path: '',
                element: <GamesListPage/>
            },
            {
                path: 'game/:id',
                element: <AboutGame/>
            },
            {
                path: 'shopping-cart',
                element: <ProtectedRoute element={<ShoppingCart/>}/> 
            },
            {
                path: 'wish-list',
                element: <ProtectedRoute element={<WishList/>}/> 
            },
            {
                path: 'account/settings',
                element: <ProtectedRoute element={<AccountSettings/>}/>
            },
            {
                path: 'account/personal-profile',
                element: <ProtectedRoute element={<PersonalAccPage/>}/> 
            }
        ]

    }
])

export function AppProvider() {
    return <RouterProvider router={router}/>
}