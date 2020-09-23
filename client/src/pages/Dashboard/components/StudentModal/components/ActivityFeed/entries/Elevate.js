import Icon from "components/Icon";
import React from "react";

import {
    Tag
} from "react-bulma-components";

import Date from "../components/Date";
import FeedEntry from "../components/FeedEntry";

const Elevate = ( { by, data, date } ) => {

    return (
        <FeedEntry>
            <Tag className="start" color="danger">
                <Icon icon="level-up-alt" />
            </Tag>
            <span>
                <a href="#fake">{by.name}</a> elevated <strong>name</strong> to <a href="#fake">{data.to.name}</a>
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

export default Elevate;