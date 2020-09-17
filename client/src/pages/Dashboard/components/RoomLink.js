import React from "react";
import { useClassroom } from "../store";
import { Link } from "react-router-dom";

const RoomLink = ( { to, ...props } ) => {
    
    const classroom = useClassroom();

    return classroom
    
        ? <Link to={`/${classroom._id}${to === "/" ? "" : to}`} {...props} />

        : <Link to={to} {...props} />;

}

export default RoomLink;