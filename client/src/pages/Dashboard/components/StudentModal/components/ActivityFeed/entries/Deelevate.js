import React from "react";

import {
    Tag
} from "react-bulma-components";

import Icon from "components/Icon";
import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";
import UserName from "../components/UserName";

const Deelevate = ( { by, date } ) => {

    return (
        <FeedEntry>
            <Tag className="start" color="primary">
                <Icon icon="level-down-alt" />
            </Tag>
            <span>
                <a href="#fake"><UserName user={by} /></a> de-elevated this student
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

export default Deelevate;