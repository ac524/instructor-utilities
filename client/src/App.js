import React from "react";
import TopNavbar from "./components/TopNavbar"
import "./App.sass";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Pages from "./pages"

function App() {
    return (
        <div>
            <TopNavbar />
            <Router>
                <div>
                    <Route exact path="/" component={Pages.Home} />
                    <Route exact path="/classroom" component={Pages.Classroom} />
                </div>
            </Router>
        </div>
    )
}

export default App;