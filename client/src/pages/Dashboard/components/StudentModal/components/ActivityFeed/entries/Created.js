import React from "react";

import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";

const Created = ( { by, date } ) => {

    return (
        <FeedEntry>
            <span>
                <a href="#fake">You</a> added <strong>name</strong>
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

export default Created;