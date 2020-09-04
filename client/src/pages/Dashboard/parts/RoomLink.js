import React from "react";
import { useClassroom } from "../store";
import { Link } from "react-router-dom";

function RoomLink( { to, ...props } ) {
    
    const classroom = useClassroom();

    return classroom
    
        ? <Link to={`/${classroom._id}${to}`} {...props} />

        : null;

}

export default RoomLink;