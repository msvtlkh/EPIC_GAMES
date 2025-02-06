import { useNavigate } from 'react-router'
import styles from './GameBanner.module.scss'
import { CreateImageFromResponse } from '../../Lib/CreateImageFromResponse'

interface CardInfoInterface {
    title: string
    _id: string
    horizontalImage: string
}

export default function GameBanner(props: CardInfoInterface) {
    const { title, _id, horizontalImage } = props

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/game/${_id}`)
    }


    return(
        <div className={styles.card}>
            <img src={CreateImageFromResponse(horizontalImage)} alt="banner" className={styles.image}/>

            <p className={styles.title}>{title}</p>
            <p className={styles.desc}>维斯珀的第二面神秘魔镜正等着那些对宝藏无比饥渴的命运决</p>

            <button onClick={handleClick} className={styles.btn}>了解详情</button>
        </div>
    )
}