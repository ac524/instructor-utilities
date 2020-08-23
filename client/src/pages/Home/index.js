import React from "react";
import MainHero from "./parts/MainHero";
import MainWithLogin from "../../layouts/MainWithLogin";

function Home() {
    return (
        <MainWithLogin>
            <MainHero />
        </MainWithLogin>
    )
}

export default Home;