import React, { useEffect, useRef } from "react";

import "./style.sass";

export const useToolbarOffset = ( offset ) => {

    useEffect(() => {

        document.documentElement.style.marginLeft = `${offset}px`;

    }, [])

}

function Toolbar() {

    useToolbarOffset(55);

    return (
        <div class="toolbar">

        </div>
    )

}

export default Toolbar;