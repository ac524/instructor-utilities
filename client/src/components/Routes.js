import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Pages from "../pages";

import { useIsAuthenticated } from "../utils/auth";

export const GuestRoute = ({ children, redirectTo = "/", ...props }) => {

    const isAuth = useIsAuthenticated();

    const render = ({ location }) => {
        return isAuth
        
            ? <Redirect to={{ pathname: redirectTo, state: { from: location } }} />
            
            : children;
    }

    return (
        <Route
          {...props}
          render={render}
        />
    );

}

function Routes() {

    const isAuth = useIsAuthenticated();

    const homeAuthRedirect = isAuth ? "/5f4ac8bc492845084bdd36a5" : "/";

    return (
        <Switch>
            <Route path="/devs" exact component={Pages.Developers} />
            <Route path="/privacy" exact component={Pages.Privacy} />
            <GuestRoute path="/register" exact><Pages.Register /></GuestRoute>
            <GuestRoute path="/" exact redirectTo={homeAuthRedirect}><Pages.Home /></GuestRoute>
            { isAuth ? <Route path="/:roomId" component={Pages.Dashboard} /> : null }
            <Route path="*" component={Pages.NotFound} />
        </Switch>
    )
}

 export default Routes;