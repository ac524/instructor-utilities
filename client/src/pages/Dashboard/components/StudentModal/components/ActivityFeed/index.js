import React, { useEffect, useReducer } from "react";
import api from "utils/api";
import { useSocket } from "utils/socket.io";
import CommentForm from "./components/CommentForm";

import {
    Comment,
    Created,
    Elevate,
    Deelevate
} from "./entries"

import "./style.sass";

const typeMap = {
    create: Created,
    comment: Comment,
    elevate: Elevate,
    deelevate: Deelevate
}

const getAction = ( action, payload ) => ({action, payload});

const ActivtyFeed = ({ student }) => {

    const [ items, dispatch ] = useReducer((state, { action, payload })=>{
        switch(action) {
            case "set":
                return [ ...payload ];
            case "add":
                return [ ...state, payload ];
            default:
                return state;
        }
    }, []);

    const { feed } = student;
    const socket = useSocket();

    const feedEntryComponentMap = item => {

        if( !typeMap[item.action] ) return null;

        const Entry = typeMap[item.action];

        return <Entry key={item._id} student={student} by={item.by} date={item.date} data={item.data} />

    }

    // const pushItem = item => dispatch(getAction("add",item));

    useEffect(() => {

        const handleFeedPush = message => dispatch(getAction("add",message.payload));

        socket.on( `rockfish:fish`, message => console.log("inner",message) );
        // socket.on( `feedpush:${feed}`, handleFeedPush );

        return () => socket.off( `feedpush:${feed}`, handleFeedPush );

    }, [feed, socket, dispatch]);

    useEffect(() => {

        const getItems = async () => dispatch(getAction( "set", (await api.getFeedItems(feed)).data ));

        try {

            getItems();

        } catch(err) {

            console.log( err );

        }

    },[feed]);

    // const items = [
    //     {
    //         _id: 1,
    //         action: "create",
    //         by: {
    //             name: "You"
    //         },
    //         date: "2020-09-23T08:01:41.017Z"
    //     },
    //     {
    //         _id: 2,
    //         action: "comment",
    //         by: {
    //             name: "Anthony Brown"
    //         },
    //         data: {
    //             comment: "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."
    //         },
    //         date: "2020-09-23T08:01:41.017Z"
    //     },
    //     {
    //         _id: 3,
    //         action: "elevate",
    //         by: {
    //             name: "You"
    //         },
    //         data: {
    //             to: { name: "You" }
    //         },
    //         date: "2020-09-23T08:01:41.017Z"
    //     },
    //     {
    //         _id: 4,
    //         action: "deelevate",
    //         by: {
    //             name: "You"
    //         },
    //         date: "2020-09-23T08:01:41.017Z"
    //     }
    // ];

    return (
        <div className="feed has-filled-content">
            <div className="feed-entries">
                {items.map( feedEntryComponentMap )}
            </div>
            <CommentForm feedId={feed} />
        </div>
    );

}

export default ActivtyFeed;