import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';

import Header from "../layout/Header";
import FeaturedStories from "../layout/FeaturedStories";
import Footer from "../layout/Footer";

function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/')
        .then(res => res.json())
        .then(data => {
            setData(data.message);
        })
    }, []);

    return (
        <div id="home-page" className="h-full w-full absolute flex flex-col justify-between">
            <Helmet>
                <title>FableScape | Home</title>
                <meta name="description" content="FableScape is a central hub for lovers of all things fantasy and medieval. Play stories created by the community or create your own." />
                <meta property="og:title" content="FableScape | Home" />
                <meta property="og:description" content="FableScape is a central hub for lovers of all things fantasy and medieval. Play stories created by the community or create your own." />
            </Helmet>

            <Header />
            {data ? (<p className="w-full bg-green-300 text-center">{data}</p>) : (<p className="w-full bg-red-400 text-center">No data</p>)}
            <FeaturedStories />
            <Footer />
        </div>
    )
}

export default Home;