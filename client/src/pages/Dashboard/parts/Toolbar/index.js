import React, { useEffect } from "react";

import "./style.sass";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoutLink } from "../../../../components/Login";

export const useToolbarOffset = ( offset ) => {

    useEffect(() => {

        document.documentElement.style.marginLeft = `${offset}px`;

        return () => document.documentElement.style.marginLeft = null;

    }, [offset])

}

function Toolbar() {

    useToolbarOffset(55);

    return (
        <div className="toolbar">
            <Link to="/" className="item" aria-label="Dashboard home">
                <FontAwesomeIcon icon="home" />
            </Link>
            <Link to="/team" className="item" aria-label="Manage team">
                <FontAwesomeIcon icon="users" />
            </Link>
            <Link to="/students" className="item" aria-label="Manage students">
                <FontAwesomeIcon icon="user-graduate" />
            </Link>
            <LogoutLink className="item end" aria-label="Logout">
                <FontAwesomeIcon icon={['far','arrow-alt-circle-left']} />
            </LogoutLink>
        </div>
    )

}

export default Toolbar;