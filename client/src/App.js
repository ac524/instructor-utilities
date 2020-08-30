import React, { useEffect } from "react";
import "./App.sass";

import { useAuthTokenStore } from "./utils/auth";
import { useReadyStep } from "./utils/ready";
import Routes from "./components/Routes";
import LoadingOverlay from "./components/LoadingOverlay";
import { useIsReady } from "./utils/ready";

import { library } from '@fortawesome/fontawesome-svg-core';

import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add( faArrowAltCircleLeft, faArrowAltCircleRight, faAngleDown, faGithub );

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