import React from "react";

import {
    Button
} from "react-bulma-components";

import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";

const Comment = ( { by, data, date } ) => {

    return (
        <FeedEntry block>
            <Button className="start is-circle">
                <span className="icon">{by.name[0]}</span>
            </Button>
            <div className="fill box">
                <Date date={date} />
                <p>{data.comment}</p>
            </div>
        </FeedEntry>
    );

}

export default Comment;