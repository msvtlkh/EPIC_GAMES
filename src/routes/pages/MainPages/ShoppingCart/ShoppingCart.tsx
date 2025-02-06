import LongGameCart from '../../../../components/LongGameCart/LongGameCart'
import styles from './ShoppingCart.module.scss'

export default function ShoppingCart() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.card__wrapper}>
                <h1 className={styles.title}>我的购物车</h1>

                <ul className={styles.list}>
                    <LongGameCart image={''} name='人工智能的选择 Heart of the Machine' price={100} secondBtnName='移至愿望清单'/>
                    <LongGameCart image={''} name='lol' price={100} secondBtnName='移至愿望清单'/>
                </ul>
            </div>

            <div className={styles.payment__block}>
                <h2 className={styles.payment__title}>游戏和应用概览</h2>

                <ul className={styles.total__list}>
                    <li className={styles.item}>
                        <span className={styles.name}>价格</span>
                        <span className={styles.price}>RUB 2,099.00</span>
                    </li>
                    <li className={styles.item}>
                        <span className={styles.name}>税费</span>
                        <span className={styles.price}>结帐时计算</span>
                    </li>
                </ul>

                <div className={styles.total__block}>
                    <span className={styles.tota__block__name}>小计</span>
                    <span className={styles.total__price}>RUB 1,899.20</span>
                </div>

                <button className={styles.btn}>下单</button>
            </div>
        </div>
    )
}