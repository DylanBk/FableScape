import React from "react";

import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const show_register_form = () => {
    if (document.getElementById("register-form")) {
        console.log("reg form found")
        const register_form = document.getElementById("register-form");
        const login_form = document.getElementById("login-form");
        const switch_to_register_btn = document.getElementById("show-register-form-btn");
        const switch_to_login_btn = document.getElementById("show-login-form-btn")

        login_form.style.visibility = "hidden";
        switch_to_register_btn.style.visibility = "hidden";
        register_form.style.visibility = "visible";
        switch_to_login_btn.style.visibility = "visible";
    };
};

const show_login_form = () => {
    if (document.getElementById("login-form")) {
        console.log("login form found")
        const register_form = document.getElementById("register-form");
        const login_form = document.getElementById("login-form");
        const switch_to_register_btn = document.getElementById("show-register-form-btn");
        const switch_to_login_btn = document.getElementById("show-login-form-btn");

        register_form.style.visibility = "hidden";
        switch_to_login_btn.style.visibility = "hidden";
        login_form.style.visibility = "visible";
        switch_to_register_btn.style.visibility = "visible";
    };
};

// absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2
// absolute -left-32 -top-28
// absolute -right-32 -top-28

export default function EntryFormContainer() {
    return (
        <div className="h-2/5 w-3/4 absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-full absolute left-1/2 flex flex-row gap-5 justify-center bg-blue-300 -translate-x-1/2">
                <button
                    id="show-register-form-btn"
                    className="absolute -left- -top-10 px-4 py-2 bg-accent text-nowrap hover:bg-accent_dark"
                    onClick={show_register_form}>
                    Show Register
                </button>
                <button
                id="show-login-form-btn"
                className="absolute -top-10 px-4 py-2 bg-accent text-nowrap hover:bg-accent_dark"
                onClick={show_login_form}>
                    Show Login
                </button>
            </div>
            <div className="">
                <RegisterForm />
            </div>
            <div className="">
                <LoginForm />
            </div>
        </div>
    )
}