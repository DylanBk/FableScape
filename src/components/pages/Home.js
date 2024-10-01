import React from "react";
import { Helmet } from 'react-helmet';

import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function Home() {
    return (
        <div id="home-page" className="h-full w-full">
            <Helmet>
                <title>FableScape | Home</title>
                <meta name="description" content="FableScape is a central hub for lovers of all things fantasy and medieval. Play stories created by the community or create your own." />
                <meta property="og:title" content="FableScape | Home" />
                <meta property="og:description" content="FableScape is a central hub for lovers of all things fantasy and medieval. Play stories created by the community or create your own." />
            </Helmet>

            <Header />
            <Footer />
        </div>
    );
};