import React from "react";

// const dateFormat = new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "2-digit"
// });

const Date = ( { date, className, ...props } ) => {

    const classes = [ "date" ];
    if( className ) classes.push( className );

    return (
        <span className={classes.join(" ")} {...props}>
            {/*dateFormat.format(date)*/}
            {date}
        </span>
    )

}

export default Date;