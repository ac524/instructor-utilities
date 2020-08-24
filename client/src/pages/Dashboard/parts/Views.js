import React from "react";
import { Switch, Route } from "react-router-dom";
import Classroom from "../views/Classroom";
import Students from "../views/Students";
import Team from "../views/Team";

function Views() {

    return (
        <Switch>
            <Route exact path="/" component={Classroom} />
            <Route exact path="/students" component={Students} />
            <Route exact path="/team" component={Team} />
        </Switch>
    );

}

export default Views;