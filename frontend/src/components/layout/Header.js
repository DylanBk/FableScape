import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import useWindowDimensions from "../../utils/getWindowDimensions";

const burger_menu = require('../../icons/burger-menu.png');
const button = require('../../icons/button.png')

function Header() {
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
            ref={headerRef}>
            {winWidth < 468 ? (
                <button>
                    <img
                        className="h-10 my-auto"
                        src={burger_menu}
                        alt="Burger Menu Icon"></img>
                    </button>
            ) : (
                <div className="flex gap-4 ml-4 my-auto text-sm sm:text-base md:text-lg lg:text-xl text-white font-cinzel">
                    <Link 
                        className="hover:underline-arrow-small"
                        to="hub">
                        View Stories
                    </Link>
                    <Link className="hover:underline-arrow-small">
                        Create a Story
                    </Link>
                    <Link
                        className="absolute top-1/2 right-52 text-sm sm:text-base md:text-lg lg:text-xl text-white font-cinzel -translate-y-1/2"
                        to="/play">
                        <p className="w-20 mx-auto text-center hover:underline-arrow-small">Play</p>
                    </Link>
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
                    className="absolute top-1/2 right-4 -translate-y-1/2 sm:hover:scale-105 smooth-resize"
                    to="/login">
                    <img
                        className="h-8 sm:h-10 md:h-14 lg:h-16 relative smooth-resize"
                        src={button}
                        alt="Button Background"/>
                    <p className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-sm sm:text-base md:text-lg lg:text-xl font-cinzel smooth-resize">Login</p>
                </Link>
            )}
        </div>
    )
}

export default Header;