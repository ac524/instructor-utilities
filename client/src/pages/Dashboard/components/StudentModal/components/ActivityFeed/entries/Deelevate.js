import React from "react";

import {
    Tag
} from "react-bulma-components";

import Icon from "components/Icon";
import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";

const Deelevate = ( { by, data, date } ) => {

    return (
        <FeedEntry>
            <Tag className="start" color="primary">
                <Icon icon="level-down-alt" />
            </Tag>
            <span>
                <a href="#fake">{by.name}</a> delevated <strong>name</strong>
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

export default Deelevate;