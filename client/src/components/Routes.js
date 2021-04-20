import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Pages from "pages";

import { useIsAuthenticated, useAuthorizedUser } from "utils/auth";

export const GuestRoute = ({ component: Component, children, redirectTo = "/", ...props }) => {

    const isAuth = useIsAuthenticated();

    const render = ({ location }) => (
        isAuth
        
            ? <Redirect to={{ pathname: redirectTo, state: { from: location } }} />
            
            : (Component ? <Component /> : children)
    );

    return (
        <Route
          {...props}
          render={render}
        />
    );

}

export const PrivateRoute = ({ component: Component, children, redirectTo = "/", ...props }) => {

    const isAuth = useIsAuthenticated();

    const render = ({ location }) => (
        isAuth
        
            ? (Component ? <Component /> : children) 
            
            : <Redirect to={{ pathname: redirectTo, state: { from: location } }} />
    );    

    return (
        <Route
          {...props}
          render={render}
        />
    );

}

const Routes = () => {

    let guestRedirect

    const authUser = useAuthorizedUser();

    if(!authUser) {
        guestRedirect = "/";
    } else if(authUser.classrooms.length) {
        guestRedirect = `/r/${authUser.classrooms[0]}`;
    } else {
        guestRedirect = "/settings";
    }

    return (
        <Switch>
            <Route path="/devs" exact component={Pages.Developers} />
            <Route path="/privacy" exact component={Pages.Privacy} />
            <Route path="/validate-email/:token" exact component={Pages.ValidateEmail} />
            <Route path="/invite/:token" exact component={Pages.Invite} />

            <GuestRoute path="/register" exact redirectTo={guestRedirect} component={Pages.Register} />
            <GuestRoute path="/" exact redirectTo={guestRedirect} component={Pages.Home}/>

            <PrivateRoute path="/r/:roomId" component={Pages.Dashboard} />
            <PrivateRoute path="/settings" component={Pages.Dashboard} />
            
            <Route path="*" component={Pages.NotFound} />
        </Switch>
    )
}

 export default Routes;