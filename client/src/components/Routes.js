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

    const render = () => isAuth ? (Component ? <Component /> : children) : <Pages.NotFound />;

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
        guestRedirect = "/"

    }else if(authUser.classrooms.length>0){
        guestRedirect = `/${authUser.classrooms[0]}`
    }
    else {
        guestRedirect = "/settings"
    }



    return (
        <Switch>
            <Route path="/devs" exact component={Pages.Developers} />
            <Route path="/privacy" exact component={Pages.Privacy} />
            <Route path="/validate-email/:token" exact component={Pages.ValidateEmail} />
            <Route path="/invite/:token" exact component={Pages.Invite} />

            <GuestRoute path="/register" redirectTo={guestRedirect} exact component={Pages.Register} />
            <GuestRoute path="/" exact redirectTo={guestRedirect} component={Pages.Home}/>

            <PrivateRoute path="/:roomId" component={Pages.Dashboard} />
            
            <Route path="*" component={Pages.NotFound} />
        </Switch>
    )
}

 export default Routes;