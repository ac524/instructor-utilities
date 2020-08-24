import React, { useEffect, useRef } from "react";

import "./style.sass";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoutLink } from "../../../../components/Login";

export const useToolbarOffset = ( offset ) => {

    useEffect(() => {

        document.documentElement.style.marginLeft = `${offset}px`;

        return () => document.documentElement.style.marginLeft = null;

    }, [])

}

function Toolbar() {

    useToolbarOffset(55);

    return (
        <div className="toolbar">
            <Link to="/" className="item">
                <FontAwesomeIcon icon="home" />
            </Link>
            <Link to="/team" className="item">
                <FontAwesomeIcon icon="users" />
            </Link>
            <Link to="/students" className="item">
                <FontAwesomeIcon icon="user-graduate" />
            </Link>
            <LogoutLink className="item end">
                <FontAwesomeIcon icon={['far','arrow-alt-circle-left']} />
            </LogoutLink>
        </div>
    )

}

export default Toolbar;