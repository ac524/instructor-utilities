import React from "react";

import {
    Button,
    Tag
} from "react-bulma-components";

import Dropdown from "components/Dropdown";
import Icon from "components/Icon";
import api from "utils/api";
import { useParams } from "react-router-dom";
import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { EDIT_STUDENT, REMOVE_STUDENT } from "pages/Dashboard/store/actionsNames";
import { useHandleFeedEventResponse } from "pages/Dashboard/utils/feed";
import { useSocket } from "utils/socket.io";
import RequirePerm from "../../RequirePerm";

const ElevateButton = ({feed}) => {

    const handleFeedEventResponse = useHandleFeedEventResponse(feed);

    const elevate = async () => {

        try {

            handleFeedEventResponse( (await api.createElevate( feed )).data );

        } catch(err) {

            // TODO error handling
            console.log(err);

        }
        
    }

    return (
        <Button className="dropdown-item" size="small" onClick={elevate}>
            <Tag className="start is-small mr-2" color="danger">
                <Icon icon="level-up-alt" />
            </Tag>
            <span>Elevate</span>
        </Button>
    )

}

const DeelevateButton = ({feed}) => {

    const handleFeedEventResponse = useHandleFeedEventResponse(feed);

    const deelevate = async () => {

        try {

            handleFeedEventResponse( (await api.createDeelevate( feed )).data );

        } catch(err) {

            // TODO error handling
            console.log(err);

        }
        
    }

    return (
        <Button className="dropdown-item" size="small" onClick={deelevate}>
            <Tag className="start is-small mr-2" color="primary">
                <Icon icon="level-down-alt" />
            </Tag>
            <span>De-elevate</span>
        </Button>
    )

}

const RemoveButton = ({studentId}) => {

    const dispatch = useDashboardDispatch();
    const { roomId } = useParams();
    const socket = useSocket();

    const remove = async () => {

        try {

            await api.removeStudent( studentId );

            dispatch(gda( EDIT_STUDENT, false ));

            const removeDispatch = gda( REMOVE_STUDENT, studentId );
            dispatch( removeDispatch );
            socket.emit( `${roomId}:dispatch`, removeDispatch );

        } catch(err) {

            // TODO error handling
            console.log(err);

        }
        
    }

    return (
        <Button className="dropdown-item" size="small" onClick={remove}>
            <Icon icon={["far", "trash-alt"]} />
            <span>Remove</span>
        </Button>
    )

}



export const StudentOptions = ({ student, ...props }) => {

    const RemoveStudentButton = () => <RemoveButton studentId={student._id} />;

    return (
        <Dropdown label={<Icon icon="ellipsis-h" />} ariaLabel={`Open options for ${student.name}`} {...props}>
            { student.elevation ? <DeelevateButton feed={student.feed} /> : <ElevateButton feed={student.feed} /> }
            <RequirePerm item="student" action="delete" component={RemoveStudentButton} />
        </Dropdown>
    );

}