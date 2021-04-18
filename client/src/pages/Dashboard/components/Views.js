import React from "react";
import { Switch, Route } from "react-router-dom";
import Classroom from "pages/Dashboard/views/Classroom";
import Students from "pages/Dashboard/views/Students";
import Team from "pages/Dashboard/views/Team";
import UserSettings from "pages/Dashboard/views/UserSettings";

const Views = () => {

    return (
        <Switch>
            <Route exact path={`/r/:roomId`} component={Classroom} />
            <Route exact path={`/r/:roomId/students`} component={Students} />
            <Route path={`/r/:roomId/team`} component={Team} />
        </Switch>
    );

}

export default Views;