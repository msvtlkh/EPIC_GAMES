import styles from './SmallGameCard.module.scss'
import { CreateImageFromResponse } from '../../Lib/CreateImageFromResponse'

interface GameInterface {
    img: string
    title: string
    id: string
    onClick?: () => void
}

export default function SmallGameCard(props: GameInterface) {
    const { img, title, id, onClick } = props

    return(
        <div className={styles.card} id={id} onClick={onClick ? onClick : undefined}>
            <img src={CreateImageFromResponse(img)} alt="icon" className={styles.img}/>
            <p className={styles.title}>{title}</p>
        </div>
    )
}