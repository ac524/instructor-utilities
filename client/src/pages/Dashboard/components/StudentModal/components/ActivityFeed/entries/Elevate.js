import Icon from "components/Icon";
import React from "react";

import {
    Tag
} from "react-bulma-components";

import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";
import UserName from "../components/UserName";

const Elevate = ( { by, data, date } ) => {

    return (
        <FeedEntry>
            <Tag className="start" color="danger">
                <Icon icon="level-up-alt" />
            </Tag>
            <span>
                <a href="#fake"><UserName user={by} /></a> elevated this student
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

export default Elevate;