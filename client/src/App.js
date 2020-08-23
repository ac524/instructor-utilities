import React, { useEffect } from "react";
import TopNavbar from "./components/TopNavbar"
import "./App.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Pages from "./pages";
import { LoginModalProvider, LoginModal } from "./components/Login"
import { useAuthTokenStore, useIsAuthenticated } from "./utils/auth";
// import LoadingPulse from "./components/LoadingPulse";
import { useStoreContext, getStoreAction as gsa } from "./store";
import { IS_READY } from "./store/actions";

function App() {

    const { store: { isReady }, storeDispatch } = useStoreContext();

    const isAuthCheckDone = useAuthTokenStore();

    useEffect(() => {

        if( isAuthCheckDone ) storeDispatch(gsa(IS_READY));

    }, [isAuthCheckDone]);

    const isAuth = useIsAuthenticated();
    
    return (
        <div>
            <LoginModalProvider>
                <TopNavbar />
                {
                    isReady
                        ? (
                            <Router>
                                {
                                    isAuth

                                        // Authenticated Routes
                                        ? (
                                            <div>
                                                <Route exact path="/" component={Pages.Classroom} />
                                            </div>
                                        )
                                        
                                        // Unauthenticated Routes
                                        : (
                                            <div>
                                                <Route exact path="/" component={Pages.Home} />
                                                <Route exact path="/register" component={Pages.Register} />
                                            </div>
                                        )
                                }
                            </Router>
                        )

                        : null
                }
                <LoginModal />
            </LoginModalProvider>
        </div>
    )
}

export default App;