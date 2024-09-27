import React from "react";

import Header from "../layout/Header";
import RegisterForm from "../layout/RegisterForm";
import Footer from "../layout/Footer";

const bg_img = require('../../images/epic-bg.png')

function Entry() {
    return (
        <div className="h-screen relative flex flex-col overflow-hidden">
            <img
                className="h-full max-h-full md:h-auto md:max-h-none absolute left-1/2 top-1/2 2xl:border 2xl:border-accent object-cover smooth-resize -translate-x-1/2 -translate-y-1/2"
                src={bg_img}
                alt="bg"></img>
            <Header />
            <RegisterForm />
            <Footer />
        </div>
    )
}

export default Entry;