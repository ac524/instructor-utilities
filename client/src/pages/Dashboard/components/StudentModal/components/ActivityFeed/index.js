import Icon from "components/Icon";
import React from "react";

import {
    Button,
    Tag
} from "react-bulma-components";

import "./style.sass";

// const dateFormat = new Intl.DateTimeFormat("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "2-digit"
// });

const Date = ( { date, className, ...props } ) => {

    const classes = [ "date" ];
    if( className ) classes.push( className );

    console.log(date, className, props);

    return (
        <span className={classes.join(" ")} {...props}>
            {/*dateFormat.format(date)*/}
            {date}
        </span>
    )

}

const FeedEntry = ({ children, block }) => {

    const classes = ["feed-entry"];

    if( block ) classes.push("is-block-entry");

    return <div className={classes.join(" ")}>{children}</div>;

}

const Created = ( { by, date } ) => {

    return (
        <FeedEntry>
            <span>
                <a href="#fake">You</a> added <strong>name</strong>
            </span>
            <Date date={date} className="end" />
        </FeedEntry>
    );

}

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

const Deelevate = ( { by, data, date } ) => {

    return (
        <FeedEntry>
            <Tag className="start" color="primary">
                <Icon icon="level-down-alt" />
            </Tag>
            <span>
                <a href="#fake">{by.name}</a> de-elevated <strong>name</strong>
            </span>
            <span className="date end">
                {date}
            </span>
        </FeedEntry>
    );

}

const typeMap = {
    create: Created,
    comment: Comment,
    elevate: Elevate,
    deelevate: Deelevate
}

const feedEntryComponentMap = item => {

    if( !typeMap[item.action] ) return null;

    const Entry = typeMap[item.action];

    return <Entry key={item._id} by={item.by} date={item.date} data={item.data} />

}

const ActivtyFeed = () => {

    const feed = [
        {
            _id: 1,
            action: "create",
            by: {
                name: "You"
            },
            date: "2020-09-23T08:01:41.017Z"
        },
        {
            _id: 2,
            action: "comment",
            by: {
                name: "Anthony Brown"
            },
            data: {
                comment: "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."
            },
            date: "2020-09-23T08:01:41.017Z"
        },
        {
            _id: 3,
            action: "elevate",
            by: {
                name: "You"
            },
            data: {
                to: { name: "You" }
            },
            date: "2020-09-23T08:01:41.017Z"
        },
        {
            _id: 4,
            action: "deelevate",
            by: {
                name: "You"
            },
            date: "2020-09-23T08:01:41.017Z"
        }
    ];

    return (
        <div className="feed">
            {feed.map( feedEntryComponentMap )}
        </div>
    );

}

export default ActivtyFeed;