import React from "react";

import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";
import UserName from "../components/UserName";

const Created = ( { student, by, date } ) => {

    return (
        <FeedEntry>
            <span>
                <a href="#fake"><UserName user={by} /></a> added <strong>{student.name}</strong>
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

export default Created;