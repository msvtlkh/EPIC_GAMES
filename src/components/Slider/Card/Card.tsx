import { useNavigate } from 'react-router'
import { CardInterface } from '../../../types/game'
import styles from './Card.module.scss'
import { CreateImageFromResponse } from '../../../Lib/CreateImageFromResponse'

export default function Card(props: CardInterface){
    const { verticalImage, name, price, id } = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/game/${id}`)
    }

    return(
        <div className={styles.card} onClick={handleClick}>
            <img src={CreateImageFromResponse(verticalImage)} alt="image" className={styles.image} />

            <div className={styles.desc}>
                <span className={styles.name}>{name}</span>
                <span className={styles.price}>{`¥${price}`}</span>
            </div>
        </div>
    )
}