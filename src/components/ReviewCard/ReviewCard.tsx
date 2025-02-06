import styles from './ReviewCard.module.scss'

export default function ReviewCard() {
    return(
        <div className={styles.card}>
            <div className={styles.user__grade}>Game Informer</div>
            <div className={styles.user__nickname}>作者：Matt Bertz</div>

            <div className={styles.rate}>10/10</div>

            <div className={styles.review}>
            Rockstar has once again created a game that redefines the open-world experience. Red Dead Redemption II is a triumph that every gamer should experience for themselves
            </div>
        </div>
    )
}