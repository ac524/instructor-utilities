import { useState, useEffect } from "react";
import { useStoreContext, getStoreAction as gsa } from "../store";
import { ADD_READY_STEP, COMPLETE_READY_STEP, REMOVE_READY_STEP, UNCOMPLETE_READY_STEP } from "../store/actions"

export const useIsReady = () => {

    const [ { ready: { complete, steps } } ] = useStoreContext();
    const [ isReady, setIsReady ] = useState( false );

    useEffect(() => {

        setIsReady( !steps.length || steps.every( step => complete.includes( step ) ) );

    }, [ steps, complete, setIsReady ] )

    return isReady;

}

export const useReadyStep = ( step ) => {

    const [ ,dispatch ] = useStoreContext();

    const [ [ add, complete, remove, uncomplete ] ] = useState([
        // add
        () => dispatch(gsa( ADD_READY_STEP, step )),
        // complete
        () => dispatch(gsa( COMPLETE_READY_STEP, step )),
        // remove
        () => dispatch(gsa( REMOVE_READY_STEP, step )),
        // uncomplete
        () => dispatch(gsa( UNCOMPLETE_READY_STEP, step ))
    ]);

    useEffect(() => {

        add();

        return () => remove();

    }, [add, remove]);

    return [ complete, uncomplete ];

}