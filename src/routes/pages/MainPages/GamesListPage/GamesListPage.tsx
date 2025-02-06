import banner from '../../../../assets/banner/banner.png'
import gameBanner from '../../../../assets/background/sale.png'
import styles from './GamesListPage.module.scss'
import { useGetDiscountGamesQuery, useGetFreeGamesQuery, useGetHighRatedGamesQuery, useGetNewGamesQuery, useGetSixHighRatedGamesQuery, useGetThreeNewGamesQuery, useGetTwoHighRatedGamesQuery } from '../../../../api/apiSlice'
import { getDataFromResponse } from '../../../../Lib/getDataFromResponse'
import Slider from '../../../../components/Slider/Slider'
import GameBanner from '../../../../components/GameBanner/GameBanner'
import SmallGameCard from '../../../../components/SmallGameCard/SmallGameCard'
import { useEffect, useState } from 'react'
import { Game } from '../../../../types/game'
import { cutText } from '../../../../Lib/CutText'
import { useNavigate } from 'react-router'
import { CreateImageFromResponse } from '../../../../Lib/CreateImageFromResponse'

interface DefaultGameInterface {
    _id: string,
    name: string,
    description: string,
    images: {
        coverHorizontal: string
    }
}

export default function GamesListPage() {
    const [ selectedGameId, setSelectedGameId ] = useState<string>('')
    const navigate = useNavigate()
    const [ selectedGame, setSelectedGame ] = useState<Game | DefaultGameInterface>({
        _id: '679b45c82a85ee12cb4aa632',
        name: '5月19日至6月16日',
        description: '畅享最高 75% 特价优惠，每周免费大作游戏，超级特惠以及 25% 特价Epic游戏商城优惠券！',
        images: {
            coverHorizontal: ''
        }
    })

    const { data: freeGamesData } = useGetFreeGamesQuery()
    const { data: discountGamesData } = useGetDiscountGamesQuery()
    const { data: highRatedGamesData } = useGetHighRatedGamesQuery()
    const { data: twoHighRatedGames } = useGetTwoHighRatedGamesQuery()
    const { data: threeNewGames } = useGetThreeNewGamesQuery()
    const { data: sixHighRatedGames } = useGetSixHighRatedGamesQuery()
    const { data: newGames } = useGetNewGamesQuery()

    const handleCardClick = (gameId: string) => {
        setSelectedGameId(gameId)
    }

    const handleClicktoNewPage = (id: string) => {
        navigate(`/game/${id}`)
    }  

    useEffect(() => {
        if(selectedGameId && sixHighRatedGames) {
            const foundedGame = getDataFromResponse(sixHighRatedGames).find((game) => game._id === selectedGameId)

            if(foundedGame) {
                setSelectedGame(foundedGame)
            }
        }
    }, [selectedGameId, sixHighRatedGames])    

    return(
        <div>
                    <div className={styles.sale__wrapper}>
                        <div 
                            className={styles.left__wrapper}
                            style={{
                                backgroundImage: selectedGame.images.coverHorizontal === '' ? `url(${gameBanner})` : `url(${CreateImageFromResponse(selectedGame.images.coverHorizontal)})`,
                                backgroundSize: 'cover',               
                                backgroundPosition: 'center'
                            }}
                        >
                            <p className={styles.date}>{selectedGame.name}</p>
                            <p className={styles.game__desc}>{cutText(selectedGame.description)}</p>

                            <button className={styles.buy__btn} onClick={() => handleClicktoNewPage(selectedGameId === '' ? selectedGame._id : selectedGameId)}>立刻加入愿望清单</button>
                        </div>

                        <div className={styles.right__wrapper}>
                            { sixHighRatedGames ? (
                                getDataFromResponse(sixHighRatedGames).map((game) => (
                                    <SmallGameCard
                                        key={game._id}
                                        id={game._id}
                                        title={game.name}
                                        img={game.images.coverVertical}
                                        onClick={() => handleCardClick(game._id)}
                                    />
                                ))
                            ) : (
                                <div>Нет доступных игр</div>
                            )}
                        </div>
                    </div>

                    <Slider title='最近更新' games={newGames ? getDataFromResponse(newGames) : []}/>
                    
                    <div className={`${styles.bannerCard__wrapper} ${styles.twoCardsLayout}`}>
                        { twoHighRatedGames ? (
                            getDataFromResponse(twoHighRatedGames).map((game) => (
                            <GameBanner
                                key={game._id}
                                title={game.name}
                                _id={game._id}
                                horizontalImage={game.images.coverHorizontal}
                            />
                            ))
                        ) : (
                            <div>Нет доступных игр</div>
                        )}
                    </div>

                    <Slider title='免费' games={freeGamesData ? getDataFromResponse(freeGamesData) : []}/>
                    <Slider title='优惠' games={discountGamesData ? getDataFromResponse(discountGamesData) : []}/>

                    <div className={`${styles.bannerCard__wrapper} ${styles.threeCardsLayout}`}>
                        { threeNewGames ? (
                            getDataFromResponse(threeNewGames).map((game) => (
                            <GameBanner
                                key={game._id}
                                title={game.name}
                                _id={game._id}
                                horizontalImage={game.images.coverHorizontal}
                            />
                            ))
                        ) : (
                            <div>Нет доступных игр</div>
                        )}
                    </div>

                    <Slider title='最受欢迎' games={highRatedGamesData ? getDataFromResponse(highRatedGamesData) : []}/>

                    <div className={styles.banner}>
                        <img src={banner} alt="banner" />

                        <div className={styles.banner__text__wrapper}>
                            <span className={styles.name}>浏览完整目录</span>
                            <p className={styles.desc}>通过按照类型、要素、价格以及更多检索条件，来找到你的下一款最爱...</p>
                        </div>
                    </div>
        </div>
    )
}



