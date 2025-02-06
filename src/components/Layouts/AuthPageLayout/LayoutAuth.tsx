import { Outlet } from 'react-router'
import styles from './LayoutAuth.module.scss'

export default function LayoutAuthPage() {
    return (
        <div className={styles.wrapper}>
            <Outlet/>
        </div>
    )
}