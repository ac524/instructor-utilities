import Icon from "components/Icon";
import {
    Tag
} from "react-bulma-components";

import Date from "components/Date";
import UserName from "components/UserName";

import FeedEntry from "../components/FeedEntry";

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