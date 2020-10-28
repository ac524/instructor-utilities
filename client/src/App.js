import React, { useEffect } from "react";
import "./App.sass";

import LoadingOverlay from "./components/LoadingOverlay";
import Routes from "./components/Routes";

import { useAuthTokenStore } from "./utils/auth";
import { useIsReady, useReadyStep } from "./utils/ready";
import loadGlobalIcons from "./utils/icons";
import { useAuthSubscription, useSocketConnection } from "./utils/socket.io";
import Fade from "./animations/Fade";

loadGlobalIcons();

const App = () => {

    useSocketConnection();

    const [ completeStep ] = useReadyStep("authcheck");

    const isReady = useIsReady();

    const isAuthCheckDone = useAuthTokenStore();

    useAuthSubscription();

    useEffect(() => {

        if( isAuthCheckDone ) completeStep();

    }, [isAuthCheckDone, completeStep]);
    
    return (
        <div>
            {isAuthCheckDone ? <Routes /> : null}
            <Fade className="is-relative" show={!isReady} type="out" style={{zIndex: 100}}><LoadingOverlay /></Fade>
        </div>
    )

}

export default App;