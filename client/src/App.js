import React, { useEffect } from "react";
import "./App.sass";

import { useAuthTokenStore } from "./utils/auth";
import { useReadyStep } from "./utils/ready";
import Routes from "./components/Routes";
import LoadingOverlay from "./components/LoadingOverlay";
import { useIsReady } from "./utils/ready";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';

library.add( faArrowAltCircleLeft );

function App() {

    const [ completeStep ] = useReadyStep("authcheck");

    const isReady = useIsReady();

    const isAuthCheckDone = useAuthTokenStore();

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