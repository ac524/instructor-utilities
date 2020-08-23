import React from "react";

function WebLink( { children, ...props } ) {
    return <a {...props} rel="noopener noreferrer" target="_blank">{children}</a>
}

export default WebLink;