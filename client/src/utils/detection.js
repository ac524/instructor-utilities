import { useRef, useEffect } from "react";

export const useOutsideClickDispatch = ( { isActive, dispatch, action } ) => {

    const inBoundsElementRef = useRef();

    useEffect(() => {

        if( !isActive ) return;

        /**
         * Alert if clicked on outside of element
         */
        const handleClickOutside = event => {
            if (inBoundsElementRef.current && !inBoundsElementRef.current.contains(event.target)) {
                dispatch( action );
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [inBoundsElementRef, isActive, dispatch, action]);

    return inBoundsElementRef;

}