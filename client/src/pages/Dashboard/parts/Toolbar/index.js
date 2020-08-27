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
        <div className="toolbar has-background-white">
            <div className="item">
                <Link to="/" aria-label="Dashboard home">
                    <FontAwesomeIcon icon="home" />
                </Link>
            </div>
            <div className="item">
                <Link to="/team" aria-label="Manage team">
                    <FontAwesomeIcon icon="users" />
                </Link>
            </div>
            <div className="item">
                <Link to="/students" aria-label="Manage students">
                    <FontAwesomeIcon icon="user-graduate" />
                </Link>
            </div>
            <div className="item end">
                <LogoutLink aria-label="Logout">
                    <FontAwesomeIcon icon={['far','arrow-alt-circle-left']} />
                </LogoutLink>
            </div>
        </div>
    )

}

export default Toolbar;