import { useStudentFeed, useStudentFeedLoader } from "pages/Dashboard/store";
import React/*, { useEffect, useReducer }*/ from "react";
// import api from "utils/api";
// import { useSocket } from "utils/socket.io";
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

const ActivtyFeed = ({ student }) => {

    const { feed } = student;

    useStudentFeedLoader(feed);
    const entries = useStudentFeed();

    // const socket = useSocket();

    const feedEntryComponentMap = item => {

        if( !typeMap[item.action] ) return null;

        const Entry = typeMap[item.action];

        return <Entry key={item._id} student={student} by={item.by} date={item.date} data={item.data} />

    }

    // useEffect(() => {

    //     const handleFeedPush = message => dispatch(getAction("add",message.payload));

    //     // socket.on( `rockfish:fish`, message => console.log("inner",message) );
    //     // socket.on( `feedpush:${feed}`, handleFeedPush );

    //     return () => socket.off( `feedpush:${feed}`, handleFeedPush );

    // }, [feed, socket, dispatch]);

    // useEffect(() => {

    //     const getItems = async () => dispatch(getAction( "set", (await api.getFeedItems(feed)).data ));

    //     try {

    //         getItems();

    //     } catch(err) {

    //         console.log( err );

    //     }

    // },[feed]);

    return (
        entries &&
        <div className="feed has-filled-content">
            <div className="feed-entries">
                {entries.map( feedEntryComponentMap )}
            </div>
            <CommentForm feedId={feed} />
        </div>
    );

}

export default ActivtyFeed;