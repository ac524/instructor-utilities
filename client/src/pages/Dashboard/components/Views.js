import React from "react";
import { Switch, Route, useParams } from "react-router-dom";
import Classroom from "../views/Classroom";
import Students from "../views/Students";
import Team from "../views/Team";

function Views() {

    const {roomId} = useParams();

    return (
        <Switch>
            <Route exact path={`/${roomId}`} component={Classroom} />
            <Route exact path={`/${roomId}/students`} component={Students} />
            <Route exact path={`/${roomId}/team`} component={Team} />
        </Switch>
    );

}

export default Views;