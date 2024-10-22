import React, { useState } from "react";

const button = require('../../icons/button.png');

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log("login successful")
        } else {
            console.error("login failed")
        }
    }

    return (
        <div>
            <div id="Login-form">
                <form
                    className="h-2/5 w-3/4 md:w-1/2 absolute left-1/2 top-1/2 flex flex-col items-center justify-center p-8 border border-accent bg-black bg-opacity-30 -translate-x-1/2 -translate-y-1/2 smooth-resize"
                    onSubmit={handleSubmit}
                    method="post">
                    <label className="text-white font-cinzel">Username</label>
                        <input
                            name="username"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:text-sm md:text-lg font-poppins"
                            type="text"
                            onChange={handleChange}
                            required></input>
                    <label className="text-white font-cinzel">Email</label>
                        <input
                            name="email"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:text-sm md:text-lg font-poppins placeholder-gray-600"
                            type="email"
                            placeholder="name@domain.com"
                            onChange={handleChange}
                            autoComplete={true}
                            required></input>
                    <label className="text-white font-cinzel">Password</label>
                        <input
                            name="password"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:te-sm md:text-lg font-poppins"
                            type="password"
                            onChange={handleChange}
                            required></input>
                    <button
                        className="absolute bottom-8 smooth-resize"
                        type="submit">
                        <img
                            className="min-h-6 min-w-max md:min-h-12 aspect-video absolute left-1/2 -translate-x-1/2"
                            src={button}
                            alt="Login Button Background"></img>
                        <p className="absolute left-1/2 -bottom-9 font-cinzel font-bold -translate-x-1/2">Login</p>
                    </button>
                </form>
            </div>
            <div id="login-form"></div>
        </div>
    )
}

export default LoginForm;