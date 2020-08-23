import React, { useEffect } from "react";
import TopNavbar from "./components/TopNavbar"
import "./App.sass";
import { LoginModalProvider, LoginModal } from "./components/Login"
import { useAuthTokenStore } from "./utils/auth";
// import LoadingPulse from "./components/LoadingPulse";
import { useStoreContext, getStoreAction as gsa } from "./store";
import { IS_READY } from "./store/actions";
import Routes from "./components/Routes";

function App() {

    const { store: { isReady }, storeDispatch } = useStoreContext();

    const isAuthCheckDone = useAuthTokenStore();

    useEffect(() => {

        if( isAuthCheckDone ) storeDispatch(gsa(IS_READY));

    }, [isAuthCheckDone]);
    
    return (
        <div>
            <LoginModalProvider>
                <TopNavbar />
                { isReady ? <Routes /> : null }
                <LoginModal />
            </LoginModalProvider>
        </div>
    )
}

export default App;