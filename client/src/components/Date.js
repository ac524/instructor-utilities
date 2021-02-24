import React from "react";
import { DateTime } from "luxon";

const formats = {
    toRelative: dateTime => formatDate(dateTime.toRelative()),
    default: (dateTime, format) => dateTime.toFormat(format)
}

const formatDate = (dateTime) =>{
    const [, numberString, type ] = dateTime.match(/(\d+)\s+(second|day)s?/) || [];
    
    if(!numberString || !type) return dateTime

    if(type === "second") return "now"

    const number = parseInt(numberString)

    if(number >= 7)  return `${Math.floor(number / 7)} weeks ago`

    return dateTime
              
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