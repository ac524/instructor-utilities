import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Pages from "../pages";

import { useIsAuthenticated } from "../utils/auth";

// Unauthenticated Routes
const GuestRoutes = () => {
    return (
        <div>
            <Route exact path="/" component={Pages.Home} />
            <Route exact path="/register" component={Pages.Register} />
        </div>
    )
}

// Authenticated Routes
const AuthRoutes = () => {
    return (
        <div>
            <Route exact path="/" component={Pages.Classroom} />
        </div>
    )

}

function Routes() {

    const isAuth = useIsAuthenticated();

    return (
        <Router>
            { isAuth ? <AuthRoutes /> : <GuestRoutes /> }
        </Router>
    )
}

 export default Routes;