import Pulse from "components/Pulse";
import { useStudentFeed, useStudentFeedLoader } from "pages/Dashboard/store";
import { useEffect, useRef } from "react";

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

export const ActivtyFeed = ({ student, className = "", style = {}, ...props }) => {

    const { feed } = student;
    const feedRef = useRef();

    useStudentFeedLoader(feed);
    const entries = useStudentFeed();

    const feedEntryComponentMap = item => {

        if( !typeMap[item.action] ) return null;

        const Entry = typeMap[item.action];

        return <Entry key={item._id} feedId={feed} _id={item._id} student={student} by={item.by} date={item.date} data={item.data} />

    }

    useEffect(()=>{

        if(!feedRef.current) return;

        feedRef.current.scrollTop = feedRef.current.scrollHeight;

    },[feedRef, entries]);

    return (
        entries
        ? (
            <div ref={feedRef} className={`${className} box feed`} style={{ ...style, overflowY: "scroll" }} {...props}>
                <div className="feed-entries">
                    {entries.map( feedEntryComponentMap )}
                </div>
            </div>
        )
        : <div className={`${className} box is-flex`} style={{...style, alignItems:"center"}}><Pulse /></div>
    );

};

export { CommentForm } from "./components/CommentForm";