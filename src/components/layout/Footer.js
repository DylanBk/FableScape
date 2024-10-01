import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div
            id="footer"
            className="h-32 w-full absolute bottom-0 flex mt-64 bg-black text-gray-400">
            <ul className=" h-3/5 flex flex-col justify-center px-4 sm:px-10 md:ml-10 my-auto text-sm smooth-resize">
                <li className="active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/">Home</Link></li>
                <li className="active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/login">Sign Up</Link></li>
                <li className="active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/login">Login</Link></li>
                <li className="active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/play">Play</Link></li>
            </ul>
            <ul className="h-3/5 flex flex-col justify-center px-4 sm:px-10 border-l border-gray-400 my-auto text-sm smooth-resize">
                <li className="active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/settings">Account</Link></li>
                <li className="active:text-white active:underline md:hover:text-white md:hover:underline"><Link to="/settings">Settings</Link></li>
            </ul>
            <p className="absolute right-4 bottom-4 text-gray-500 text-sm md:text-base">Developed by <a href="https://github.com/DylanBk">DylanBk</a></p>
        </div>
    );
};