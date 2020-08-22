import React from "react";
import TopNavbar from "./components/TopNavbar"
import "./App.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Pages from "./pages";
import { LoginModalProvider, LoginModal } from "./components/Login"
import { useAuthTokenStore, useIsAuthenticated } from "./utils/auth";

function App() {

    useAuthTokenStore();

    const isAuth = useIsAuthenticated();
    
    return (
        <div>
            <LoginModalProvider>
                <TopNavbar />
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
                <LoginModal />
            </LoginModalProvider>
        </div>
    )
}

export default App;