import React, { useState } from "react";
import { Helmet } from "react-helmet";

import Header from "../layout/Header";
import RegisterForm from "../layout/RegisterForm";
import LoginForm from "../layout/LoginForm";
import Footer from "../layout/Footer";

const bg_img = require('../../images/epic-bg.png');

const page_title = "FableScape | Auth Form";

const authCheck = () => {
    const cookies = document.cookie.split(';');
    return cookies.some(cookie => cookie.startsWith('loggedIn='));
};

export default function Entry() {
    const isLoggedIn = authCheck();

    if (isLoggedIn) {
        window.location.href = '/'
    }

    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="h-screen relative flex flex-col overflow-hidden">
            <Helmet>
                <title>{page_title}</title>
                <meta property="og:title" content={page_title} />
            </Helmet>
            <img
                className="h-full max-h-full md:h-auto md:max-h-none absolute left-1/2 top-1/2 2xl:border 2xl:border-accent object-cover smooth-resize -translate-x-1/2 -translate-y-1/2"
                src={bg_img}
                alt="bg"/>
            <Header />
            <div
                id="auth-container"
                className="h-2/5 w-3/4 md:w-1/2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                    id="focus-login-btn"
                    className={`absolute top-0 right-1/4 px-4 py-2 bg-accent hover:bg-accent_dark font-cinzel font-bold z-10 ${showLogin ? 'hidden' : 'block'}`}
                    onClick={() => setShowLogin(true)}>
                    Login
                </button>

                <button
                    id="focus-reg-btn"
                    className={`absolute left-1/4 top-0 px-4 py-2 bg-accent hover:bg-accent_dark font-cinzel font-bold z-10 ${showLogin ? 'block' : 'hidden'}`}
                    onClick={() => setShowLogin(false)}>
                    Register
                </button>

                {showLogin ? <LoginForm /> : <RegisterForm />}
            </div>
            <Footer />
        </div>
    );
};