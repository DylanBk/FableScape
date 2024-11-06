// import CryptoJS from 'crypto-js'
// import {lib as CryptoLib, mode, pad } from 'crypto-js'
import React, { useEffect, useState } from "react";

const button = require('../../icons/button.png');

// const secret_key = process.env.REACT_APP_SECRET_KEY


function RegisterForm() {
    useEffect(() => {
        document.getElementById('error-msg').style.visibility = "hidden";
    },[])

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

    // function pad(data) {
    //     const blockSize = 16;
    //     const padding = blockSize - (data.length % blockSize)
    //     const paddedData = data + String.fromCharCode(padding).repeat(padding)
    //     return paddedData
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("form submission started")

        // const pw = formData.password;
        // const padded_pw = pad(pw);

        // console.log(`pre enc pw: ${pw}`)
        // const lengthInBytes = pw.length;

        // console.log("Length of password in bytes:", lengthInBytes);
        // console.log("Length of password after padding (if needed):", padded_pw);

        // const iv = CryptoJS.lib.WordArray.random(16);
        // console.log("Generated IV (Hex):", iv.toString(CryptoJS.enc.Hex));
        // console.log("IV length:", iv.sigBytes);

        // const encrypted = CryptoJS.AES.encrypt(pw, secret_key, {
        //     iv: iv,
        //     mode: CryptoJS.mode.CFB,
        //     padding: CryptoJS.pad.NoPadding
        // });

        // const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
        // const ciphertextBase64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
        // console.log("IV (Base64):", ivBase64);
        // console.log("Ciphertext (Base64):", ciphertextBase64);
        // const iv_and_ciphertext = ivBase64 + ":" + ciphertextBase64;
        // console.log("IV and ciphertext (Base64):", iv_and_ciphertext);

        // document.getElementById('hidden-pw').value = iv_and_ciphertext;
        // document.getElementById('register-pw').value = '';

        // formData.password = iv_and_ciphertext

        try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            document.getElementById('error-msg').textContent = "";
            console.log("sign up successful");
            window.location.href = '/login';
        } else {
            const err = await response.json();
            console.error(`error signing up: ${err.message}`);
            if (err.message === "user already exists") {
                document.getElementById('error-msg').style.visibility = "visible";
                document.getElementById('error-msg').textContent = "A user with that email address already exists";
            };
        };
        } catch (error) {
            console.log(`sign up error: ${error}`);
        };
    };

    return (
        <div>
            <div id="register-form">
                <form
                    id="register-form-form"
                    className="h-full w-full absolute left-1/2 top-1/2 flex flex-col items-center justify-center p-8 border border-accent bg-black bg-opacity-30 -translate-x-1/2 -translate-y-1/2 smooth-resize"
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
                            id="register-pw"
                            name="password"
                            className="w-full bg-white bg-opacity-30 backdrop-blur-sm sm:w-3/4 p-1 text-xs sm:te-sm md:text-lg font-poppins"
                            type="password"
                            onChange={handleChange}
                            required></input>
                    {/*<input
                        id='hidden-pw'
                        name='hidden-pw'
                        type='hidden'
                        ></input>*/}
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
                        <p className="absolute left-1/2 -bottom-9 font-cinzel font-bold -translate-x-1/2">Register</p>
                    </button>
                </form>
            </div>
            <div id="login-form"></div>
        </div>
    )
};

export default RegisterForm;