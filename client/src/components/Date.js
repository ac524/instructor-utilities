import React from "react";
import { DateTime } from "luxon";

const formats = {
    toRelative: dateTime => dateTime.toRelative(),
    default: (dateTime, format) => dateTime.toFormat(format)
}

const Date = ( { date, format = "toRelative", className, ...props } ) => {

    const classes = [ "date" ];
    if( className ) classes.push( className );

    const dateTime = DateTime.fromISO(date);

    return (
        <span className={classes.join(" ")} {...props}>
            { formats[format] ? formats[format](dateTime) : formats.default(dateTime, format) }
        </span>
    )

}

export default Date;