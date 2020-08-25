import React from "react";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Pages from "../pages";

import { useIsAuthenticated } from "../utils/auth";

export const GuestRoute = ({ children, ...props }) => {

    const isAuth = useIsAuthenticated();

    return (
        <Route
          {...props}
          render={({ location }) => isAuth ? <Redirect to={{ pathname: "/", state: { from: location } }} /> : children}
        />
    );

}

function Routes() {

    const isAuth = useIsAuthenticated();

    return (
        <Router>
            <Switch>
                <Route path="/devs" exact component={Pages.Developers} />
                <Route path="/privacy" exact component={Pages.Privacy} />
                <GuestRoute path="/register" exact><Pages.Register /></GuestRoute>
                <Route path="/" exact={!isAuth} component={isAuth ? Pages.Dashboard : Pages.Home} />
                <Route path="*" component={Pages.Developers} />
            </Switch>
        </Router>
    )
}

 export default Routes;