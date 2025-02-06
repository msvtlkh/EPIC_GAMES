import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import facebook from "../../../assets/icons/facebook.svg";
import search from "../../../assets/icons/search.svg";
import twitter from "../../../assets/icons/twitter.svg";
import youtube from "../../../assets/icons/youtube.svg";
import mark from "../../../assets/icons/mark.png";
import btn__arrow from "../../../assets/icons/btn__arrow.svg";
import epic__icon from "../../../assets/icons/epic_icon.svg";
import epic__icon2 from "../../../assets/icons/epic__games.svg";
import { useLazySearchGamesQuery } from "../../../api/apiSlice";
import useDebounceCallback from "../../../Lib/useDebounceCallback";
import styles from "./MainGamePageLayout.module.scss";
import { ClickAwayListener } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useCookies } from "react-cookie";

export default function MainGamePageLayout() {
    const navigate = useNavigate()
    // const [ cookies ] = useCookies(['accessToken'])
    const dispatch = useDispatch<AppDispatch>()
    const [isDropMenuOpen, setIsDropMenuOpen] = useState<boolean>(false);
    const [searchGames, { data }] = useLazySearchGamesQuery();
    const searchGamesDebounce = useDebounceCallback(searchGames, 300);

    const handleCloseDropMenu = () => setIsDropMenuOpen(false);
    const handleOpenDropMenu = () => setIsDropMenuOpen(true);

    const handleSearch = (gameName: string) => {
        if (gameName) handleOpenDropMenu();
        else handleCloseDropMenu();
        searchGamesDebounce(gameName || "-");
    }

    const handleClick = (_id: string) => {
        navigate(`/game/${_id}`)
        handleCloseDropMenu()
    }

    // useEffect(() => {
    //     console.log(cookies.accessToken)
    // }, [cookies])

    const gameSearchResult = data?.data.games.map((game, index) => (
        <li className={styles.dropMenu__item} key={index} onClick={() => handleClick(game._id)}>
            <img
                className={styles.dropMenu__img}
                src={`http://epicgamesserver/images/${game.images.coverVertical}`}
                alt={`${game.name}`}
            />
            <p className={styles.dropMenu__gameName}>{game.name}</p>
        </li>
    ));

    return (
        <div className={styles.wrapper}>
            <header id="top" className={styles.header}>
                <div className={styles.left__side__wrapper}>
                    <Link to={"/"} className={styles.icon__wrapper}>
                        <img src={epic__icon} alt="epic icon" />
                    </Link>

                    <ul className={styles.list}>
                        <Link to={"/"} className={`${styles.item} ${styles.item__active}`}>
                            商场
                        </Link>
                        <li className={styles.item}>常见问题</li>
                        <li className={styles.item}>帮助</li>
                        <li className={styles.item}>虚幻引擎</li>
                    </ul>
                </div>

                <div className={styles.right__side__wrapper}>

                    <Link to={"/auth"} className={styles.icon__wrapper}>
                        <img src="" alt="" />
                        <span>登录</span>
                    </Link>

                    <button className={styles.btn}>获得客户端</button>
                </div>
            </header>

            <main className={styles.container}>
                <div className={styles.search__wrapper}>
                    <div className={styles.input__wrapper}>
                        <ClickAwayListener onClickAway={handleCloseDropMenu}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="搜索"
                                    className={styles.search__input}
                                    onClick={(e) => {
                                        const value = (e.target as HTMLInputElement).value;
                                        if (value) handleOpenDropMenu();
                                    }}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <img src={search} className={styles.search__icon} alt="search" />
                                <ul
                                    className={
                                        isDropMenuOpen
                                            ? `${styles.dropMenu}`
                                            : `${styles.dropMenu} ${styles.dropMenu__hidden}`
                                    }
                                >
                                    { gameSearchResult ? gameSearchResult.length > 0 ? (
                                        gameSearchResult
                                    ) : (
                                        <li className={styles.noResults}>没有找到游戏</li>
                                    ) : null}
                                </ul>
                            </div>
                        </ClickAwayListener>
                    </div>

                    <ul className={styles.pages__list}>
                        <li className={styles.pages__item__active}>探索</li>
                        <li className={styles.pages__item}>浏览</li>
                        <li className={styles.pages__item}>新闻</li>
                    </ul>
                </div>

                <Outlet />
            </main>

            <footer className={styles.footer}>
                <div className={styles.first__line}>
                    <ul className={styles.socials__wrapper}>
                        <li className={styles.social__item}>
                            <a href="https://www.facebook.com">
                                <img src={facebook} alt="facebook" />
                            </a>
                        </li>
                        <li className={styles.social__item}>
                            <a href="https://x.com/?mx=2">
                                <img src={twitter} alt="twitter" />
                            </a>
                        </li>
                        <li className={styles.social__item}>
                            <a href="https://www.youtube.com/">
                                <img src={youtube} alt="youtube" />
                            </a>
                        </li>
                    </ul>

                    <a href="#top" className={styles.anchor__btn}>
                        <img src={btn__arrow} alt="arrow" />
                    </a>
                </div>

                <div className={styles.second__line}>
                    <div className={styles.lists__wrapper}>
                        <div className={styles.sources}>
                            <span className={styles.title}>资源</span>

                            <ul className={`${styles.list} ${styles.sources__list}`}>
                                <li className={styles.sources__item}>创作者支持计划</li>
                                <li className={styles.sources__item}>爱好者作品政策</li>
                                <li className={styles.sources__item}>在线服务</li>
                                <li className={styles.sources__item}>在Epic Games上发布</li>
                                <li className={styles.sources__item}>用户体验调查</li>
                                <li className={styles.sources__item}>社区守则</li>
                                <li className={styles.sources__item}>职业</li>
                                <li className={styles.sources__item}>商城最终用户授权协议</li>
                                <li className={styles.sources__item}>Epic Newsroom</li>
                                <li className={styles.sources__item}>公司</li>
                            </ul>
                        </div>

                        <div className={styles.games}>
                            <span className={styles.title}>由Epic Games开发</span>

                            <ul className={`${styles.list} ${styles.games__list}`}>
                                <li className={styles.games__item}>Battle Breakers</li>
                                <li className={styles.games__item}>Robo Recall</li>
                                <li className={styles.games__item}>Fortnite</li>
                                <li className={styles.games__item}>Shadow Complex</li>
                                <li className={styles.games__item}>Infinity Blade</li>
                                <li className={styles.games__item}>Unreal Tournament</li>
                            </ul>
                        </div>
                    </div>

                    <img src={mark} alt="mark" />
                </div>

                <div className={styles.third__line}>
                    <p className={styles.text}>
                        © 2022, Epic Games, Inc. 版权所有。Epic、Epic Games、Epic
                        Games标志、Fortnite（堡垒之夜）、Fortnite（堡垒之夜）标志、Unreal（虚幻）、Unreal
                        Engine（虚幻引擎）、Unreal Engine（虚幻引擎）标志、Unreal
                        Tournament（虚幻竞技场）以及Unreal Tournament（虚幻竞技场）标志属于Epic
                        Games,
                        Inc.在美利坚合众国及其他地区的商标或已注册商标。其他品牌或产品名称属于其各自拥有者的商标。美国以外事务通过Epic
                        Games International, S.à r.l.办理。
                    </p>
                </div>

                <div className={styles.forth__line}>
                    <ul className={styles.list__company__policy}>
                        <li className={styles.list__company__policy__item}>服务条款</li>
                        <li className={styles.list__company__policy__item}>隐私政策</li>
                        <li className={styles.list__company__policy__item}>商店退款政策</li>
                    </ul>

                    <img src={epic__icon2} className={styles.img__icon} alt="epic icon" />
                </div>
            </footer>
        </div>
    );
}
