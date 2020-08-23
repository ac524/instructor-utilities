import React, { useEffect } from "react";
import "./App.sass";

import { useAuthTokenStore } from "./utils/auth";
// import LoadingPulse from "./components/LoadingPulse";
import { useStoreContext, getStoreAction as gsa } from "./store";
import { IS_READY } from "./store/actions";
import Routes from "./components/Routes";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {

    const { store: { isReady }, storeDispatch } = useStoreContext();

    const isAuthCheckDone = useAuthTokenStore();

    useEffect(() => {

        if( isAuthCheckDone ) storeDispatch(gsa(IS_READY));

    }, [isAuthCheckDone]);
    
    return isReady ? <Routes /> : <LoadingOverlay />;

}

export default App;