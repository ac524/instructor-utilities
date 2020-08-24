import React from "react";
import { Switch, Route } from "react-router-dom";
import Classroom from "../views/Classroom";

function Views() {

    return (
        <Switch>
            <Route exact path="/classroom" component={Classroom}/>
            <Route exact path="/" component={Classroom}/>
        </Switch>
    );

}

export default Views;