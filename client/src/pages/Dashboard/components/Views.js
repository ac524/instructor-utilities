import React from "react";
import { Switch, Route } from "react-router-dom";
import Classroom from "pages/Dashboard/views/Classroom";
import Students from "pages/Dashboard/views/Students";
import Team from "pages/Dashboard/views/Team";
import UserSettings from "pages/Dashboard/views/UserSettings";

const Views = () => {

    return (
        <Switch>
            <Route exact path="/settings" component={UserSettings} />
            <Route exact path={`/:roomId`} component={Classroom} />
            <Route exact path={`/:roomId/students`} component={Students} />
            <Route path={`/:roomId/team`} component={Team} />
        </Switch>
    );

}

export default Views;