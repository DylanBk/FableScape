import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowDimensions from "../../utils/getWindowDimensions";

const burger_menu = require('../../icons/burger-menu.png');
const button = require('../../icons/button.png')
// const plus_symbol = require('../../icons/plus-white.png');

export default function Header() {
    var winDimensions = useWindowDimensions();
    var winWidth = winDimensions.width;

    const [headerHeight, setHeaderHeight] = useState('h-16 sm:h-20 md:h-32 xl:h-40');
    const headerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("login") || location.pathname.includes("signup")) { // shorter header on login page (looks better)
            setHeaderHeight('h-10 sm:h-14 md:h-28 xl:h-32')
        }
        else {
            setHeaderHeight('h-16 sm:h-20 md:h-32 xl:h-40');
        }
    }, [location]);

    return (
        <div
            id="header"
            className={`${headerHeight} w-full relative flex flex-row bg-primary shadow-2xl shadow-black smooth-resize`}
            role="banner"
            ref={headerRef}>
            {winWidth < 468 ? (
                <button>
                    <img
                        className="h-10 my-auto"
                        src={burger_menu}
                        alt="Burger Menu Icon"></img>
                    </button>
            ) : (
                <div className="flex items-center gap-4 ml-2 md:ml-4 my-auto text-white font-cinzel">
                    {location.pathname.includes("stories") ? (
                        <></>
                    ) : (
                        <Link 
                            className="text-xs sm:text-sm md:text-md lg:text-xl hover:underline-arrow-small"
                            to="hub">
                                View Stories
                        </Link>
                    )}
                    {location.pathname.includes("create") ? (
                        <></>
                    ) : (
                        <Link
                            className="flex flex-row items-center text-xs sm:text-sm md:text-md lg:text-xl hover:underline-arrow-small"
                            to="/">
                            <p>Create<span className="text-4xl leading-6">+</span></p>
                        </Link>
                    )}
                </div>
            )}
            <Link
                className="absolute left-1/2 top-1/2 text-white font-cinzel-decorative text-2xl sm:text-4xl xl:text-5xl -translate-x-1/2 -translate-y-1/2 smooth-resize"
                to="/">
                FableScape
            </Link>
            {window.location.pathname.includes("login") || window.location.pathname.includes("signup") ? (
                <></>
            ) : (
                <Link
                    className="absolute top-1/2 right-8 -translate-y-1/2 sm:hover:scale-105 smooth-resize"
                    to="/login"
                    alt="Link to login page">
                    <img
                        className="h-8 sm:h-10 md:h-14 lg:h-16 relative smooth-resize"
                        src={button}
                        alt="Login Button Background"/>
                    <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-sm sm:text-base md:text-lg lg:text-xl font-cinzel smooth-resize">Login</p>
                </Link>
            )}
        </div>
    );
};