import React, { useEffect } from "react";
import "./App.sass";

import LoadingOverlay from "./components/LoadingOverlay";
import Routes from "./components/Routes";

import { useAuthTokenStore } from "./utils/auth";
import { useIsReady, useReadyStep } from "./utils/ready";
import loadGlobalIcons from "./utils/icons";
import { useAuthSubscription, useSocketConnection } from "./utils/socket.io";

loadGlobalIcons();

function App() {

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
            {isReady ? null : <LoadingOverlay />}
        </div>
    )

}

export default App;