import React, { useEffect } from "react";
import "./App.sass";

import { useAuthTokenStore } from "./utils/auth";
// import LoadingPulse from "./components/LoadingPulse";
import { useStoreContext, getStoreAction as gsa } from "./store";
import { IS_READY, ADD_READY_STEP, COMPLETE_READY_STEP } from "./store/actions";
import Routes from "./components/Routes";
import LoadingOverlay from "./components/LoadingOverlay";
import { useIsReady } from "./utils/ready";

function App() {

    const [ ,dispatch ] = useStoreContext();
    const isReady = useIsReady();

    const isAuthCheckDone = useAuthTokenStore();


    useEffect(() => {
        dispatch(gsa(ADD_READY_STEP, "authcheck"));
    }, []);

    useEffect(() => {

        if( isAuthCheckDone ) dispatch(gsa(COMPLETE_READY_STEP, "authcheck"));

    }, [isAuthCheckDone]);
    
    return (
        <div>
            {isAuthCheckDone ? <Routes /> : null}
            {isReady ? null : <LoadingOverlay />}
        </div>
    )

}

export default App;