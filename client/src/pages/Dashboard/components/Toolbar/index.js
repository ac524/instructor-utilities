import React, { useEffect } from "react";

import "./style.sass";

import {
    Heading,
    Button,
    Image
} from "react-bulma-components";

import { Link, useRouteMatch } from "react-router-dom";
import { LogoutButton } from "components/Login";
import RoomLink from "pages/Dashboard/components/RoomLink";
import Icon from "components/Icon";
import { useClassroom } from "pages/Dashboard/store";
import Dropdown from "components/Dropdown";
import { useAuthorizedUser } from "utils/auth";

export const useToolbarOffset = ( offset ) => {

    useEffect(() => {

        document.documentElement.style.marginLeft = `${offset}px`;

        return () => document.documentElement.style.marginLeft = null;

    }, [offset])

}

const ToolbarItem = ({ icon, exact, to="", ...props }) => {

    const match = useRouteMatch({ path: `/r/:roomId${to}` });

    const isActive = Boolean( match && (!exact || match.isExact) );

    return (
        <div className={"item" + (isActive ? " is-active" : "")}>
            <RoomLink {...props} to={to} className="action">
                <Icon icon={icon} />
            </RoomLink>
        </div>
    )

}

const Toolbar = () => {

    useToolbarOffset(55);

    const classroom = useClassroom();
    const user = useAuthorizedUser();

    const links = classroom
        ? [
            { to: "", "aria-label": "Dashboard home", icon: "chalkboard-teacher", exact: true },
            { to: `/team`, "aria-label": "Manage team", icon: "users" },
            { to: `/students`, "aria-label": "Manage students", icon: "user-graduate" }
        ]
        
        : [];

    return (
        <div className="toolbar has-background-white pt-1 pb-3">
            <div className="item">
                <Link to="/" className="action-plain p-1" style={{marginTop:"2px"}}>
                    <Image src="/images/logo-color.png" size="square" />
                </Link>
            </div>
            { links.map( link => <ToolbarItem key={link.to} {...link} /> ) }
            <div className="item end">
                <Dropdown label={user.name[0]} labelClassName="action is-circle" className="is-up is-over-btn">
                    <Heading renderAs="h2" size={6}>Hi, {user.name}</Heading>
                    <hr className="dropdown-divider" />
                    <Button renderAs={Link} to="/settings" className="dropdown-item" size="small">.
                        <Icon icon="cog" />
                        <span>Settings</span>
                    </Button>
                    <LogoutButton className="dropdown-item" size="small">
                        <Icon icon={['far','arrow-alt-circle-left']} />
                        <span>Logout</span>
                    </LogoutButton>
                </Dropdown>
            </div>
        </div>
    )

}

export default Toolbar;