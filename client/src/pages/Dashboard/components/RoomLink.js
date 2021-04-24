import React from "react";
import { useClassroom } from "pages/Dashboard/store";
import { Link } from "react-router-dom";

const RoomLink = ( { to, ...props } ) => {
    
    const classroom = useClassroom();

    return classroom
    
        ? <Link to={`/r/${classroom._id}${to}`} {...props} />

        : <Link to={to} {...props} />;

}

export default RoomLink;