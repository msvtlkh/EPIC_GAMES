import { IconButton } from '@mui/material';
import styles from './SignUp.module.scss'
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useSignUpMutation } from '../../../../api/apiSlice';
import AuthInput from '../../../../components/AuthInput/AuthInput';

interface NewUserInterface {
    nickname: string
    email: string
    password: string
    passwordConfirm: string
}

interface ErrorsMessageInterface {
    lengthError: boolean
    passwordsDontMatch: boolean
}

export default function SignUp() {
    const navigate = useNavigate()
    const [signUp, { isLoading, isError }] = useSignUpMutation()
    const [ user, setUser ] = useState<NewUserInterface>({
        nickname: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })
    const [ errorMessage, setErrorMessage ] = useState<ErrorsMessageInterface>({
        lengthError: false,
        passwordsDontMatch: false
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(user.password.length <= 8) {
            setErrorMessage({
                lengthError: true,
                passwordsDontMatch: false
            })
            return
        }

        if(user.password !== user.passwordConfirm) {
            setErrorMessage({
                lengthError: false,
                passwordsDontMatch: true
            })
            return
        }

        setErrorMessage({
            lengthError: false,
            passwordsDontMatch: false
        })

        await signUp(user)   
    }

    const handleClickToLoginPage = () => {
        navigate('/auth')
    }

    const handleClickToSignUpPage = () => {
        navigate('/auth/sign-up')
    }

    return(
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <div className={styles.icon__wrapper}>
                <IconButton onClick={handleClickToLoginPage}>
                    <LoginIcon fontSize='large' sx={{ color: 'white'}}/>
                </IconButton>
                <IconButton onClick={handleClickToSignUpPage}>
                    <CreateIcon fontSize='large' sx={{ color: 'white'}}/>
                </IconButton>
            </div>

            <h1 className={styles.title}>Создать аккаунт</h1>

            <AuthInput placeholder='введите логин' value={user?.nickname || ''} name='nickname' type='text' onChange={handleInputChange}/>
            <AuthInput placeholder='your_email@mail.ru' value={user?.email} name='email' type='email' onChange={handleInputChange}/>
            <AuthInput placeholder='введите пароль' value={user?.password} name='password' type='password' onChange={handleInputChange}/>
            <AuthInput placeholder='введите повторно пароль' value={user?.passwordConfirm} name='passwordConfirm' type='password' onChange={handleInputChange}/>
            {errorMessage.lengthError ? <span className={styles.error}>Пароль должен быть более 8 символов. Введите еще раз!</span> : null} 
            {errorMessage.passwordsDontMatch ? <span className={styles.error}>Пароли не совпадают. Введите еще раз!</span> : null} 
            {isError ? <span className={styles.error}>Пользователь с такой почтой уже существует. Введите другую почту!</span> : null} 

            <div className={styles.btn__wrapper}>
                <button className={isLoading ? styles.btn__confirmForm__loading : styles.btn__confirmForm}  type='submit'>Создать &gt;</button>
                <Link to='/auth/recover-password' className={styles.btn__resetPass}>Забыл пароль</Link>
            </div>
        </form>
    )
}


