import React from "react";

const WebLink = ( { children, ...props } ) => {
    return <a {...props} rel="noopener noreferrer" target="_blank">{children}</a>
}

export default WebLink;