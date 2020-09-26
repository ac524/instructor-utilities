import React from "react";

import {
    Button,
    Tag
} from "react-bulma-components";

import Dropdown from "components/Dropdown";
import Icon from "components/Icon";
import api from "utils/api";

const ElevateButton = ({feed}) => {

    const elevate = async () => {

        try {

            await api.createElevate( feed );

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

    const deelevate = async () => {

        try {

            await api.createDeelevate( feed );

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

const StudentOptions = ({ student, ...props }) => {

    return (
        <Dropdown label={<Icon icon="ellipsis-h" />} ariaLabel={`Open options for ${student.name}`} {...props}>
            { student.elevation ? <DeelevateButton feed={student.feed} /> : <ElevateButton feed={student.feed} /> }
        </Dropdown>
    );

}

export default StudentOptions;