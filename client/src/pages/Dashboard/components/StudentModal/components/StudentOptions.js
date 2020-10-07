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
import { EDIT_STUDENT, REMOVE_STUDENT } from "pages/Dashboard/store/actions";
import { useHandleFeedEventResponse } from "pages/Dashboard/utils/feed";

const ElevateButton = ({feed}) => {

    const handleFeedEventResponse = useHandleFeedEventResponse();

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

    const handleFeedEventResponse = useHandleFeedEventResponse();

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

    const remove = async () => {

        try {

            await api.removeStudent( roomId, studentId );

            dispatch(gda( EDIT_STUDENT, false ));
            dispatch(gda( REMOVE_STUDENT, studentId ));

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

const StudentOptions = ({ student, ...props }) => {

    return (
        <Dropdown label={<Icon icon="ellipsis-h" />} ariaLabel={`Open options for ${student.name}`} {...props}>
            { student.elevation ? <DeelevateButton feed={student.feed} /> : <ElevateButton feed={student.feed} /> }
            <RemoveButton studentId={student._id} />
        </Dropdown>
    );

}

export default StudentOptions;