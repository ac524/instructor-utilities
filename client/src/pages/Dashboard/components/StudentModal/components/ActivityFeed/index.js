import Pulse from "components/Pulse";
import { useStudentFeed, useStudentFeedLoader } from "pages/Dashboard/store";
import React from "react";
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

    const feedEntryComponentMap = item => {

        if( !typeMap[item.action] ) return null;

        const Entry = typeMap[item.action];

        return <Entry key={item._id} student={student} by={item.by} date={item.date} data={item.data} />

    }

    return (
        entries
        ? (
            <div className="feed has-filled-content">
                <div className="feed-entries">
                    {entries.map( feedEntryComponentMap )}
                </div>
                <CommentForm feedId={feed} />
            </div>
        )
        : <div className="is-flex" style={{alignItems:"center"}}><Pulse /></div>
    );

}

export default ActivtyFeed;