import React from "react";
import { Helmet } from "react-helmet";

import Header from "../layout/Header";
import RegisterForm from "../layout/RegisterForm";
import LoginForm from "../layout/LoginForm";
import Footer from "../layout/Footer";

const bg_img = require('../../images/epic-bg.png')

var page_title = "FableScape | Register" // ! temp
// TODO add {page_title} into Entry brackets, pass the title on all references
// TODO change page_title login/register based on which form is focused

function Entry() {
    return (
        <div className="h-screen relative flex flex-col overflow-hidden">
            <Helmet>
                <title>{page_title}</title>
                <meta property="og:title" content={page_title} />
            </Helmet>
            <img
                className="h-full max-h-full md:h-auto md:max-h-none absolute left-1/2 top-1/2 2xl:border 2xl:border-accent object-cover smooth-resize -translate-x-1/2 -translate-y-1/2"
                src={bg_img}
                alt="bg"></img>
            <Header />
            <div className="">
                <RegisterForm />
                <LoginForm />
            </div>
            <Footer />
        </div>
    )
}

export default Entry;