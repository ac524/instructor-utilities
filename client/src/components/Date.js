import React from "react";
import { DateTime } from "luxon";

const formats = {
    toRelative: dateTime => {
        const formatDate = dateTime.toRelative()
        
        const [, numberString, type ] = formatDate.match(/(\d+)\s+(second|day)s?/) || [];
    
        if(!numberString || !type) return formatDate

        if(type === "second") return "now"

        const number = parseInt(numberString)

        if(number >= 7)  return `${Math.floor(number / 7)} weeks ago`

        return formatDate
    },
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