import LongGameCart from '../../../../components/LongGameCart/LongGameCart'
import styles from './WishList.module.scss'

export default function WishList() {
    return(
        <div className={styles.container}>
            <h1>愿望清单</h1>

            <div className={styles.cart__wrapper}>
                    <LongGameCart image={''} name='人工智能的选择 Heart of the Machine' price={100} secondBtnName='在购物车中查看'/>
                    <LongGameCart image={''} name='lol' price={100} secondBtnName='在购物车中查看'/>
            </div>
        </div>
    )
}