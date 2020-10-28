import React from "react";

import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";
import UserName from "../components/UserName";

const Created = ( { by, date } ) => {

    return (
        <FeedEntry>
            <span>
                <a href="#fake"><UserName user={by} /></a> added this student
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

export default Created;