import React, { useContext, useState, createContext } from "react";
import { usePermissions } from "../store";

const makeKey = ( item, action ) => `${action}_${item}`.replace(" ", "_").toUpperCase();

const RequirePerm = ({ item, action, component: Component, children }) => {

    const permissions = usePermissions();

    if( !permissions.has( makeKey( item, action ) ) ) return null;

    return Component ? <Component /> : <div>{children}</div>;

}

export default RequirePerm;