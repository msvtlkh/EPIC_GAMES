import { Link } from 'react-router'
import styles from './RecoverPasswordPage.module.scss'
import { IconButton } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import { useState } from 'react';
import AuthInput from '../../../../components/AuthInput/AuthInput';

interface RecoverUserInterface {
    email: string
}

export default function RecoverPasswordPage() {
    const [ user, setUser ] = useState<RecoverUserInterface>({
        email: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUser((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    return(
        <form className={styles.wrapper}>
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

            <h1 className={styles.title}>Введите почту!</h1>

            <AuthInput placeholder='your_email@mail.ru' value={user?.email} name='email' type='email' onChange={handleInputChange}/>


            <button className={styles.btn__confirmForm}  type='submit'>Восстановить &gt;</button>

        </form>
    )
}