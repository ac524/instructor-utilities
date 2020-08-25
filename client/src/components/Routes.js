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

    routes.push({ exact: true, path: "/register", component: Pages.Register });
    
    routes.push({ path: "/", component: (isAuth ? Pages.Dashboard : Pages.Home) });
    
    routes.push({ path: "*", component: Pages.NotFound });

    return (
        <Router>
            <Switch>
                { routes.map(route => <Route key={route.path} {...route} />) }
            </Switch>
        </Router>
    )
}

 export default Routes;