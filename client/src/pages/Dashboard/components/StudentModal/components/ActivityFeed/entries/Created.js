
import Date from "components/Date";
import UserName from "components/UserName";

import FeedEntry from "../components/FeedEntry";

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