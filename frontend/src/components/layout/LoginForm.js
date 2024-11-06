import React, { useEffect, useState } from "react";

const button = require('../../icons/button.png');


function LoginForm() {
    useEffect(() => {
        document.getElementById('error-msg').style.visibility = "hidden";
    }, [])

    const [formData, setFormData] = useState({
        email: "",
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

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                document.getElementById('error-msg').textContent = "";
                console.log("login successful");
                window.location.href = '/';
                document.cookie = "loggedIn=True";
            } else {
                const err = await response.json();
                console.error(`error logging in: ${err.message}`);
                if (err.message === "incorrect password") {
                    document.getElementById('error-msg').style.visibility = "visible";
                    document.getElementById('error-msg').textContent = "Incorrect password, please try again";
                } else if (err.message === "user does not exist") {
                    document.getElementById('error-msg').style.visibility = "visible";
                    document.getElementById('error-msg').textContent = "A user with that email address does not exist";
                };
            };
        } catch (error) {
            console.log(`login error: ${error}`)
        };
    };

    return (
        <div>
            <div id="login-form">
                <form
                    id='login-form-form'
                    className="h-full w-full absolute left-1/2 top-1/2 flex flex-col items-center justify-center p-8 border border-accent bg-black bg-opacity-30 -translate-x-1/2 -translate-y-1/2 smooth-resize"
                    onSubmit={handleSubmit}
                    method="post">
                    <label className="text-white font-cinzel">Email</label>
                        <input
                            name="email"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:text-sm md:text-lg font-poppins placeholder-gray-600"
                            type="email"
                            placeholder="name@domain.com"
                            onChange={handleChange}
                            autoComplete="true"
                            required></input>
                    <label className="text-white font-cinzel">Password</label>
                        <input
                            name="password"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:text-sm md:text-lg font-poppins"
                            type="password"
                            onChange={handleChange}
                            autoComplete="true"
                            required></input>
                    <p
                        id="error-msg"
                        className="p-1 mt-4 bg-black bg-opacity-80 text-red-500 text-xs sm:text-sm md:text-base font-poppins">
                    </p>
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