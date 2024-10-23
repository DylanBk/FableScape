import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div
            id="footer"
            className="h-44 w-full absolute bottom-0 flex flex-row mt-auto bg-black text-gray-400">
            <ul className="h-fit flex flex-col justify-center gap-1 px-4 sm:px-10 md:ml-10 mt-10 text-sm smooth-resize">
                <h4 className="mb-1 text-lg font-cinzel">Quick Links</h4>
                <li className="w-fit active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/">Home</Link></li>
                <li className="w-fit active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/login">Sign Up</Link></li>
                <li className="w-fit active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/login">Login</Link></li>
                <li className="w-fit active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/play">Play</Link></li>
            </ul>
            <ul className="h-fit flex flex-col justify-center gap-1 px-4 sm:px-10 border-l border-gray-400 mt-10 text-sm smooth-resize">
                <h4 className="mb-1 text-lg font-cinzel">Configuration</h4>
                <li className="w-fit active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/settings">Account</Link></li>
                <li className="w-fit active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/settings">Settings</Link></li>
            </ul>
            <p className="absolute right-4 bottom-4 text-gray-500 text-sm md:text-base">Developed by <a href="https://github.com/DylanBk">DylanBk</a></p>
        </div>
    )
}

export default Footer;