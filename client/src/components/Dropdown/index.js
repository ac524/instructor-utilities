import { useReducer } from "react";

import { useOutsideClickDispatch } from "utils/detection";

import "./style.sass";

const Dropdown = ( { id = "dropdown-menu", label, ariaLabel, labelSize, labelClassName="", children, className = "", ...props } ) => {

    const [ isActive, dispatch ] = useReducer( ( state, action ) => action === "open" );
    const dropdownRef = useOutsideClickDispatch( { isActive, dispatch, action: "close" } );

    const toggleBtnProps = {
        className: labelClassName + " button" + (labelSize ? ` is-${labelSize}` : ""),
        "aria-haspopup": "true",
        "aria-controls": id,
        onClick: () => dispatch("open")
    }

    if(ariaLabel) toggleBtnProps["aria-label"] = ariaLabel;

    return (
        <div ref={dropdownRef} className={className + " dropdown" + (isActive ? " is-active" : "")} {...props}>
            <div className="dropdown-trigger">
                <button {...toggleBtnProps}>
                    {label}
                </button>
            </div>
            <div className="dropdown-menu" id={id} role="menu">
                <div className="dropdown-content" onClick={() => dispatch("close")}>
                    {children}
                </div>
            </div>
        </div>
    );

}

export default Dropdown;