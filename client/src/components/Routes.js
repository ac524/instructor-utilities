import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Pages from "../pages";

import { useIsAuthenticated, useAuthorizedUser } from "../utils/auth";

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

export const PrivateRoute = ({ children, redirectTo = "/", ...props }) => {

    const isAuth = useIsAuthenticated();

    const render = () => {

        return isAuth ? children : <Pages.NotFound />;

    }

    return (
        <Route
          {...props}
          render={render}
        />
    );

}

function Routes() {

    const authUser = useAuthorizedUser();

    const homeRedirect = authUser ? `/${authUser.classrooms[0]}` : "/";

    return (
        <Switch>
            <Route path="/devs" exact component={Pages.Developers} />
            <Route path="/privacy" exact component={Pages.Privacy} />
            <GuestRoute path="/register" exact><Pages.Register /></GuestRoute>
            <GuestRoute path="/" exact redirectTo={homeRedirect}><Pages.Home /></GuestRoute>
            <PrivateRoute path="/:roomId"><Pages.Dashboard /></PrivateRoute>
            <Route path="*" component={Pages.NotFound} />
        </Switch>
    )
}

 export default Routes;