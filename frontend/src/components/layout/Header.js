import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowDimensions from "../../utils/getWindowDimensions";

const account_icon = require('../../icons/account.png');
const burger_menu = require('../../icons/burger-menu.png');
const button = require('../../icons/button.png');

const authCheck = () => {
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.startsWith('loggedIn='));
};

function Header() {
    const isLoggedIn = authCheck();
    const { width: winWidth } = useWindowDimensions();
    const [headerHeight, setHeaderHeight] = useState('h-16 sm:h-20 md:h-32 xl:h-40');
    const headerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("login") || location.pathname.includes("signup")) {
            setHeaderHeight('h-10 sm:h-14 md:h-28 xl:h-32');
        } else {
            setHeaderHeight('h-16 sm:h-20 md:h-32 xl:h-40');
        }
    }, [location]);

    return (
        <div
            id="header"
            className={`${headerHeight} w-full relative flex flex-row bg-primary shadow-2xl shadow-black smooth-resize`}
            role="banner"
            ref={headerRef}
        >
            {winWidth < 468 ? (
                <button>
                    <img
                        className="h-10 my-auto"
                        src={burger_menu}
                        alt="Burger Menu Icon"
                    />
                </button>
            ) : (
                <div className="absolute left-4 top-1/2 flex flex-row items-center gap-4 ml-2 md:ml-4 text-white font-cinzel -translate-y-1/2">
                    {/* Additional Links can go here */}
                </div>
            )}
            <Link
                className="absolute left-1/2 top-1/2 text-white font-cinzel-decorative text-2xl sm:text-4xl xl:text-5xl -translate-x-1/2 -translate-y-1/2 smooth-resize"
                to="/"
            >
                FableScape
            </Link>
            {location.pathname.includes("login") || location.pathname.includes("signup") ? null : (
                <div>
                    { !window.location.href.includes('settings') ? (
                        <>
                            {isLoggedIn ? (
                                <Link
                                    className="absolute top-1/2 right-8 -translate-y-1/2 sm:hover:scale-105 smooth-resize"
                                    to="/settings">
                                    <img
                                        className="h-8"
                                        src={account_icon}
                                        alt="Link to account settings page"
                                    />
                                </Link>
                            ) : (
                                <Link
                                    id="login-btn"
                                    className="absolute top-1/2 right-8 -translate-y-1/2 sm:hover:scale-105 smooth-resize"
                                    to="/login"
                                    alt="Link to login page"
                                >
                                    <img
                                        className="h-8 sm:h-10 md:h-14 lg:h-16 relative smooth-resize"
                                        src={button}
                                        alt="Login Button Background"
                                    />
                                    <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-sm sm:text-base md:text-lg lg:text-xl font-cinzel smooth-resize">Login</p>
                                </Link>
                            )}
                        </>
                    ) : (
                        <></>
                )}
                </div>
            )}
        </div>
    );
};

export default Header;