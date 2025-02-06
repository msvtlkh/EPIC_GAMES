import styles from './AboutGame.module.scss'
import { useGetGameByIdQuery } from '../../../../api/apiSlice'
import { useNavigate, useParams } from 'react-router'
import { DateFormat } from '../../../../Lib/DateFormat'
import ReactPlayer from 'react-player'
import { useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

export default function AboutGame() {
    const navigate = useNavigate()
    const [ isPlaying, setIsPlaying ] = useState(false)
    const { id } = useParams()
    const { data } = useGetGameByIdQuery(id || '')
    const baseImageUrl = 'http://epicgamesserver/images/'
    const baseVideoUrl = 'http://epicgamesserver/videos/'

    if(!data || !data.data.game) {
        return <div>error</div>
    }

    const gameInfo = data.data.game
    const release_date = DateFormat(gameInfo.releaseDate)
    const platform = gameInfo.platform.join(', ')
    const genres = gameInfo.genres.join(', ')
    const languages = gameInfo.languages.join(', ')
    const gameImageUrl = `${baseImageUrl}${gameInfo.images.coverHorizontal}`
    const gameVideoUrl = `${baseVideoUrl}${gameInfo.images.media[0]}`

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const handleNavClickToShoppingCart = () => {
        navigate('/shopping-cart')
    }

    const handleNavClickToWishlist = () => {
        navigate('/wish-list')
    }

    return(
        <div className={styles.wrapper}>
        <h1 className={styles.big__title}>{gameInfo.name}</h1>

        <div className={styles.blocks__wrapper}>
            <div className={styles.left__side}>
                <div className={styles.game__details}>
                    <div className={styles.video__wrapper}>
                        <ReactPlayer
                            url={gameVideoUrl} 
                            playing={isPlaying}
                            controls={true}
                            width="100%" 
                            height="100%"
                        />

                        <button className={styles.player__btn} onClick={togglePlayPause}>
                            {isPlaying ? <PauseIcon fontSize='large'/> : <PlayArrowIcon fontSize='large'/>}
                        </button>
                    </div>

                    <p className={styles.big__desc}>
                       Red Dead Redemption 2 已荣获超过 175 项年度游戏奖项且获得超过 250 个满分评价，游戏以 19 世纪的最后岁月为背景，述说一个关于荣誉与忠诚的史诗故事。包含 Red Dead Redemption 2：故事模式和 Red Dead 在线模式。
                    </p>

                    <div className={styles.about__games}>
                        <div className={`${styles.game__genre} ${styles.genre_and_top__common__class}`}>
                            <span className={styles.type__name}>游戏类型</span>
                            <span>{genres}</span>
                        </div>

                        <div className={`${styles.game__type} ${styles.genre_and_top__common__class}`}>
                            <span className={styles.type__name}>功能</span>
                            <span>单人</span>
                        </div>
                    </div>

                    <p className={styles.small__title}>{gameInfo.name}</p>

                    <div className={styles.small__desc}>
                        {gameInfo.description}
                    </div>

                </div>

                <div className={styles.photo__wrapper}></div>

                {/* <div className={styles.game__parts__wrapper}>
                    <h3 className={styles.block__name}>版本</h3>

                    <GameCard/>
                </div>

                <div className={styles.socials__wrapper}>
                    <h3 className={styles.block__name}>关注我们</h3>
                </div> */}

                {/* <div className={styles.game__rate}>
                    <div className={styles.diagram}></div>

                    <div className={styles.review}>
                        <ReviewCard/>
                    </div>
                </div> */}
                <div className={styles.game__requirements__wrapper}>
                    <div className={styles.container__title}>配置</div>

                    <div className={styles.game__requirments}>
                        <div className={styles.title__decor__wrapper}>
                            <div className={styles.operation__system}>Windows</div>
                            <div className={styles.line}></div>
                        </div>

                        <div className={styles.configuration__wrapper}>
                            <div className={styles.lowest__configuration}>
                                <div className={styles.title}>最低配置</div>

                                <ul>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>操作系统</span>
                                        <span>{gameInfo.minRequirements.system}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>处理器 </span>
                                        <span>{gameInfo.minRequirements.cpu}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>内存</span>
                                        <span>{gameInfo.minRequirements.ram}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>显卡</span>
                                        <span>{gameInfo.minRequirements.videocard}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>存储空间</span>
                                        <span>{gameInfo.minRequirements.diskspace}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.recommended__configuration}>
                                <div className={styles.title}>推荐配置</div>

                                <ul>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>操作系统</span>
                                        <span>{gameInfo.recRequirements.system}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>处理器 </span>
                                        <span>{gameInfo.recRequirements.cpu}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>内存</span>
                                        <span>{gameInfo.recRequirements.ram}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>显卡</span>
                                        <span>{gameInfo.recRequirements.videocard}</span>
                                    </li>
                                    <li className={styles.list__item}>
                                        <span className={styles.item__name}>存储空间</span>
                                        <span>{gameInfo.recRequirements.diskspace}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.languages}>
                            <div className={styles.name}>支持的语言</div>
                            <div>
                                {languages}
                            </div>
                        </div>

                        <p className={styles.authorize__desc}>
                            软件授权条款请参阅游戏内说明及rockstargames.com/zh/eula；在线游戏账户使用条款请参阅zh-cn.socialclub.rockstargames.com/。使用不得转让的特殊功能，例如独家提供、可解锁、可下载、多人游戏、在线与额外内容、服务、功能时，可能需要单次使用的序号、额外负担费用和/或不可转让的在线注册账号（需年满十三岁）。使用特别游戏功能可能需要配备因特网联机，并非所有用户或在任何时间内皆能使用，并且可能不经通知而终止、修改或以不同条款提供。如果违反最终用户许可协议、行为准则或其他政策，则可能会被限制或禁止使用游戏或在线账户。如需信息、客户及技术支持，请前往support.rockstargames.com/zh。本游戏纯属虚构。游戏中可能出现与现实生活中相似的人物、地点、公司、团体、活动、建筑等内容；它们与本游戏无任何关系，且相关内容亦非事实。本游戏的制造商、发行商和授权人并未批准、容忍或鼓励任何内容。严禁未经授权进行拷贝、修改、逆向工程、反编译、传播、公共展示、租借、盈利性游玩或制售盗版和违反EULA等行为。某些限制适用于购买、使用和兑换。更多详情，敬请查看EULA (www.rockstargames.com/zh/eula)和服务条(www.rockstargames.com/zh/legal)。   Rockstar Games, Inc.  ©2005-19.Rockstar Games、Red Dead Redemption、R*、Red Dead、Dead Eye 均为 Take-Two Interactive 的标志/徽标/版权。杜比和双D符号为 Dolby Laboratories 的商标。评级图标是 Entertainment Software Association 的商标。所有其他标志和商标均为其各自所有者的产权。保留所有权利。
                        </p>

                        <p className={styles.elem}>隐私政策</p>
                    </div>
                </div>


            </div>

            <div className={styles.right__side}>
                <img src={gameImageUrl} alt="game title" className={styles.game__image}/>

                <div className={styles.price}>{`¥${gameInfo.price}`}</div>

                <button className={styles.red__btn}>立即购买</button>
                <button className={styles.btn} onClick={handleNavClickToShoppingCart}>加入购物车</button>
                <button className={styles.btn} onClick={handleNavClickToWishlist}>填至愿望清单</button>

                <ul className={styles.develop__info}>
                    <li className={styles.develop__item}>
                        <span className={styles.name}>开发商</span>
                        <span>{gameInfo.developer}</span>
                    </li>
                    <li className={styles.develop__item}>
                        <span className={styles.name}>发行商</span>
                        <span>{gameInfo.developer}</span>
                    </li>
                    <li className={styles.develop__item}>
                        <span className={styles.name}>发行日期</span>
                        <span>{release_date}</span>
                    </li>
                    <li className={styles.develop__item}>
                        <span className={styles.name}>平台</span>
                        <span>{platform}</span>
                    </li>
                </ul>
            </div>
        </div>

        </div>
    )
}