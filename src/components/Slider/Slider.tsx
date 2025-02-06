import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import styles from './Slider.module.scss'
import { Navigation } from 'swiper/modules'
import Card from './Card/Card'
import { Game } from '../../types/game'

interface MyComponentProps {
    title: string;             
    games: Game[];  
}

export default function Slider({ title, games }: MyComponentProps) {
    return(
        <div className={styles.slider}>
            <h2 className={styles.title}>{title}</h2>

            <Swiper
                modules={[Navigation]}
                spaceBetween={10}
                slidesPerView={6}
                navigation
            >
                {games.map((game) => (
                    <SwiperSlide key={game._id}>
                        <Card
                            name={game.name}
                            verticalImage={game.images.coverVertical}
                            price={game.price}
                            id={game._id} 
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}
