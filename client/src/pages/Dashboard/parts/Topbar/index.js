import React, { useState, useEffect } from "react";
import "./style.sass";
import { useDashboardContext, getDashboardAction as gda } from "../../store";
import { SET_TOPBAR } from "../../store/actions";

import Heading from "react-bulma-components/lib/components/heading";

export const useTopbarConfig = ( { name } ) => {

    const [ ,dispatch ] = useDashboardContext();

    const [ state, setState ] = useState({
        name
    });

    useEffect(() => {

        dispatch(gda( SET_TOPBAR, state ));

        return () => dispatch(gda( SET_TOPBAR, undefined ))

    }, [state, dispatch]);

    return [ state, setState ];

};

function Topbar() {

    const [ { topbar } ] = useDashboardContext();

    return topbar
        ? (
            <div className="topbar has-background-white">
                <Heading className="item title">{topbar.name}</Heading>
            </div>
        )

        : null

}

export default Topbar;