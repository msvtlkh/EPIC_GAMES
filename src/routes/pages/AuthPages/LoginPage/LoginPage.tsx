import styles from './LoginPage.module.scss'
import { IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import { Link, useNavigate } from 'react-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useLoginMutation } from '../../../../api/apiSlice';
import AuthInput from '../../../../components/AuthInput/AuthInput';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../../../slice/userSlice';

interface UserInterface {
    email: string,
    password: string
}

type ErrorType = FetchBaseQueryError | SerializedError

export default function LoginPage() {
    const [ login, { isError, error } ] = useLoginMutation()
    const isAuth = useSelector(selectIsAuthenticated)
    const navigate = useNavigate()

    const [ user, setUser ] = useState<UserInterface>({
        email: '',
        password: ''
    })
    const responseErrors = {
        userIsNotFound:  'Пользователь не найден! Попробуйте ввести почту еще раз.',
        incorrectPassword: 'Пароль введен неверно. Введите еще раз!',
        serverError: 'Внутренняя ошибка сервера. Попробуйте ввести данные позже!',
        unknownError: 'Неизвестная ошибка. Попробуйте ввести данные позже!'
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await login(user)
    }

    const ErrorHandler: React.FC<{ error: ErrorType }> = ({error}) => {
        if ('status' in error) {
            switch (error.status) {
                case 404:
                    return <span className={styles.error}>{responseErrors.userIsNotFound}</span>;
                case 401:
                    return <span className={styles.error}>{responseErrors.incorrectPassword}</span>;
                case 500:
                    return <span className={styles.error}>{responseErrors.serverError}</span>;
                default:
                    return <span className={styles.error}>{responseErrors.unknownError}</span>;
            }
        }

        return <span className={styles.error}>{responseErrors.unknownError}</span>
    }

    const renderError = () => {
        if(isError && error) {
            return <ErrorHandler error={error}/>
        }

        return null
    }


    return(
        <form className={styles.wrapper} onSubmit={handleFormSubmit}>
            <div className={styles.icon__wrapper}>
                <Link to={'/auth'}>
                    <IconButton>
                        <LoginIcon fontSize='large' sx={{ color: 'white'}}/>
                    </IconButton>
                </Link>
                <Link to={'/auth/sign-up'}>
                    <IconButton>
                        <CreateIcon fontSize='large' sx={{ color: 'white'}}/>
                    </IconButton>
                </Link>
            </div>

            <h1 className={styles.title}>Добро пожаловать!</h1>

            <AuthInput placeholder='your_email@mail.ru' value={user?.email} name='email' type='email' onChange={handleInputChange}/>
            <AuthInput placeholder='введите пароль' value={user?.password} name='password' type='password' onChange={handleInputChange}/>
            {renderError()}

            <div className={styles.btn__wrapper}>
                <button className={styles.btn__confirmForm}  type='submit'>Войти &gt;</button>
                <Link to='/auth/recover-password' className={styles.btn__resetPass}>Забыл пароль</Link>
            </div>
        </form>
    )
}