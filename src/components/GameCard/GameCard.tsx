import styles from './GameCard.module.scss'

export default function GameCard() {
    return(
        <div className={styles.card__wrapper}>
            <div className={styles.top__block}>
                <img src="" alt="" className={styles.img} />

                <div className={styles.desc__wrapper}>
                    <title>Red Dead 在线模式</title>

                    <p className={styles.desc}>
                        进入充满活力，持续进化的 Red Dead 在线模式世界体验纵横驰骋的美国边境生活。
                        追捕悬赏目标、狩猎、捕鱼和交易、寻找奇珍异宝、经营私酒酿造厂、及探索那充满惊奇深度和细节世界里的更多妙趣。
                    </p>
                </div>
            </div>

            <div className={styles.bottom__blok}>
                <div className={styles.price}>50¥</div>

                <button>加入购物车</button>
                <button>填至愿望清单</button>
            </div>
        </div>
    )
}