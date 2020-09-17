import React from "react";
import MainHero from "./components/MainHero";
import MainWithLogin from "layouts/MainWithLogin";

const Home = () => {
    return (
        <MainWithLogin>
            <MainHero />
        </MainWithLogin>
    )
}

export default Home;