import React from "react";
import { Link } from "react-router-dom";

import button from '../../icons/button.png';

const apiUrl = process.env.REACT_APP_API_URL;

export default function LoginForm() {
    return (
        <div>
            <div
                id="login-form"
                className="transition-none">
                <form
                    className="h-full w-full md:w-1/2 absolute left-1/2 top-1/2 flex flex-col items-center justify-center p-8 border border-accent bg-black bg-opacity-30 -translate-x-1/2 -translate-y-1/2 transition-transform"
                    action={`${apiUrl}/api/users/signup`}
                    method="post">
                    <label className="text-white font-cinzel">Email</label>
                        <input
                            name="email"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:text-sm md:text-lg font-poppins placeholder-gray-600"
                            type="email"
                            placeholder="name@domain.com"
                            autoComplete={true}
                            required></input>
                    <label className="text-white font-cinzel">Password</label>
                        <input
                            name="password"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:te-sm md:text-lg font-poppins"
                            type="password"
                            required></input>
                    <button
                        className="absolute bottom-8 transition-transform"
                        type="submit">
                        <img
                            className="min-h-6 min-w-max md:min-h-12 aspect-video absolute left-1/2 -translate-x-1/2"
                            src={button}
                            alt="Login Button Background"></img>
                        <p className="absolute left-1/2 -bottom-9 font-cinzel font-bold -translate-x-1/2">Login</p>
                    </button>
                </form>
            </div>
        </div>
    );
};