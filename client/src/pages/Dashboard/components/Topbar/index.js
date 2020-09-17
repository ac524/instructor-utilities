import React, { useState, useEffect } from "react";
import "./style.sass";
import { useDashboardContext, getDashboardAction as gda } from "../../store";
import { SET_TOPBAR } from "../../store/actions";

import { Heading } from "react-bulma-components";

export const useTopbarConfig = ( { name, tools } ) => {

    const [ ,dispatch ] = useDashboardContext();

    const [ state, setState ] = useState({
        name,
        tools
    });

    useEffect(() => {

        dispatch(gda( SET_TOPBAR, state ));

        return () => dispatch(gda( SET_TOPBAR, undefined ))

    }, [state, dispatch]);

    return [ state, setState ];

};

const Topbar = () => {

    const [ { topbar } ] = useDashboardContext();

    return topbar
        ? (
            <div className="topbar has-background-white is-flex" style={{alignItems:"center"}}>
                <Heading className="item title m-0">{topbar.name}</Heading>
                { topbar.tools ? <div className="is-flex topbar-tools" style={{flexGrow:1,alignItems:"center"}}>{topbar.tools}</div> : null }
            </div>
        )

        : null

}

export default Topbar;