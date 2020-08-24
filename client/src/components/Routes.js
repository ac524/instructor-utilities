import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pages from "../pages";

import { useIsAuthenticated } from "../utils/auth";

function Routes() {

    const isAuth = useIsAuthenticated();

    const routes = [
        { exact: true, path: "/devs", component: Pages.Developers },
        { exact: true, path: "/privacy", component: Pages.Privacy },
    ]

    if( isAuth ) {
        routes.push({ path: "/", component: Pages.Dashboard });
    } else {
        routes.push({ exact: true, path: "/", component: Pages.Home });
        routes.push({ exact: true, path: "/register", component: Pages.Register });
    }

    return (
        <Router>
            <Switch>
                { routes.map(route => <Route key={route.path} {...route} />) }
            </Switch>
        </Router>
    )
}

 export default Routes;