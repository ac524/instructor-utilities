import React, { useEffect } from "react";

import "./style.sass";
import { useLocation } from "react-router-dom";
import { LogoutLink } from "components/Login";
import RoomLink from "pages/Dashboard/components/RoomLink";
import Icon from "components/Icon";
import { useClassroom } from "pages/Dashboard/store";

export const useToolbarOffset = ( offset ) => {

    useEffect(() => {

        document.documentElement.style.marginLeft = `${offset}px`;

        return () => document.documentElement.style.marginLeft = null;

    }, [offset])

}

const ToolbarItem = ({ icon, ...props }) => {

    const location = useLocation();

    const isActive = props.to === "/" ? (location.pathname.indexOf("/",1) < 0) : location.pathname.endsWith( props.to );

    return (
        <div className={"item" + (isActive ? " is-active" : "")}>
            <RoomLink {...props}>
                <Icon icon={icon} />
            </RoomLink>
        </div>
    )

}

const Toolbar = () => {

    useToolbarOffset(55);

    const classroom = useClassroom();

    const links = classroom
        ? [
            { to: `/`, "aria-label": "Dashboard home", icon: "home" },
            { to: `/team`, "aria-label": "Manage team", icon: "users" },
            { to: `/students`, "aria-label": "Manage students", icon: "user-graduate" }
        ]
        
        : [ { to: "/", "aria-label": "Dashboard home", icon: "home" } ];

    return (
        <div className="toolbar has-background-white">
            { links.map( link => <ToolbarItem key={link.to} {...link} /> ) }
            <div className="item end">
                <LogoutLink aria-label="Logout">
                    <Icon icon={['far','arrow-alt-circle-left']} />
                </LogoutLink>
            </div>
        </div>
    )

}

export default Toolbar;