import React from "react";
import TopNavbar from "./components/TopNavbar"
import "./App.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Pages from "./pages";
import { LoginModalProvider, LoginModal } from "./components/Login"

function App() {
    return (
        <div>
            <LoginModalProvider>
                <TopNavbar />
                <Router>
                    <div>
                        <Route exact path="/" component={Pages.Home} />
                        <Route exact path="/classroom" component={Pages.Classroom} />
                    </div>
                </Router>
                <LoginModal />
            </LoginModalProvider>
        </div>
    )
}

export default App;