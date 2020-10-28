import React from "react";

const FeedEntry = ({ children, block }) => {

    const classes = ["feed-entry"];

    if( block ) classes.push("is-block-entry");

    return <div className={classes.join(" ")}>{children}</div>;

}

export default FeedEntry;