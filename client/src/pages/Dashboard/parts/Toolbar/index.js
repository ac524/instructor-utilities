import React, { useEffect } from "react";

import "./style.sass";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoutLink } from "../../../../components/Login";

export const useToolbarOffset = ( offset ) => {

    useEffect(() => {

        document.documentElement.style.marginLeft = `${offset}px`;

        return () => document.documentElement.style.marginLeft = null;

    }, [offset])

}

const ToolbarItem = ({ icon, ...props }) => {

    const location = useLocation();

    const isActive = props.to === location.pathname;

    return (
        <div className={"item" + (isActive ? " is-active" : "")}>
            <Link {...props}>
                <FontAwesomeIcon icon={icon} />
            </Link>
        </div>
    )

}

function Toolbar() {

    useToolbarOffset(55);

    const links = [
        { to: "/", "aria-label": "Dashboard home", icon: "home" },
        { to: "/team", "aria-label": "Manage team", icon: "users" },
        { to: "/students", "aria-label": "Manage students", icon: "user-graduate" }
    ];

    return (
        <div className="toolbar has-background-white">
            { links.map( link => <ToolbarItem key={link.to} {...link} /> ) }
            <div className="item end">
                <LogoutLink aria-label="Logout">
                    <FontAwesomeIcon icon={['far','arrow-alt-circle-left']} />
                </LogoutLink>
            </div>
        </div>
    )

}

export default Toolbar;