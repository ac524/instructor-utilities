import React from "react";

import {
    Button
} from "react-bulma-components";

import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";
import UserName from "../components/UserName";

const Comment = ( { by, data, date } ) => {

    return (
        <FeedEntry block>
            <Button className="start is-circle">
                <span className="icon">{by.name[0]}</span>
            </Button>
            <div className="fill box">
                <p className="is-flex is-size-7">
                    <span><strong><UserName user={by} /></strong> commented:</span>
                    <Date className="end" date={date} />
                </p>
                <p>{data.comment}</p>
            </div>
        </FeedEntry>
    );

}

export default Comment;