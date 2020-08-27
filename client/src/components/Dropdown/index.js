import React, { useReducer } from "react";

import { useOutsideClickDispatch } from "utils/detection";

import "./style.sass";

function Dropdown( { label, labelSize, children, className, ...props } ) {

    const [ isActive, dispatch ] = useReducer( ( state, action ) => action === "open" );
    const dropdownRef = useOutsideClickDispatch( { isActive, dispatch, action: "close" } );

    return (
        <div ref={dropdownRef} className={className + " dropdown" + (isActive ? " is-active" : "")} {...props}>
            <div className="dropdown-trigger">
                <button className={"button" + (labelSize ? ` is-${labelSize}` : "")} aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => dispatch("open")}>
                    {label}
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content" onClick={() => dispatch("close")}>
                    {children}
                </div>
            </div>
        </div>
    )

}

export default Dropdown;