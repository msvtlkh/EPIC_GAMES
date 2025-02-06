import { CreateImageFromResponse } from '../../Lib/CreateImageFromResponse'
import styles from './LongGameCart.module.scss'
import photo from '../../assets/images/game.png'

interface GameInterface {
    name: string
    image: string
    price: number
    secondBtnName: string
}

export default function LongGameCart(props: GameInterface) {
    const { name, image, price, secondBtnName } = props

    return(
        <div className={styles.wrapper}>
            {/* <img src={CreateImageFromResponse(image)} alt="" className={styles.image}/> */}
            <img src={photo} alt="" className={styles.image}/>

            <div className={styles.details}>
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>{`${price}$`}</p>

                <div className={styles.btn__wrapper}>
                    <button className={styles.first__btn}>移除</button>
                    <button className={styles.second__btn}>{secondBtnName}</button>
                </div>
            </div>
        </div>
    )
}