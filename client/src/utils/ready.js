import { useState, useEffect } from "react";
import { useStoreContext, getStoreAction as gsa } from "../store";
import { ADD_READY_STEP, COMPLETE_READY_STEP, REMOVE_READY_STEP, UNCOMPLETE_READY_STEP } from "../store/actions"

export const useIsReady = () => {

    const [ { ready: { complete, steps } } ] = useStoreContext();
    const [ isReady, setIsReady ] = useState( false );

    useEffect(() => {

        const isReady = !steps.length || steps.every( step => complete.includes( step ) );

        if( !isReady ) {
            // Apply false states immediately.
            setIsReady( isReady );
            return;
        }

        // Add a small delay to setting true states.
        const timeout = setTimeout( () => setIsReady( isReady ), 250 );

        return () => clearTimeout(timeout);

    }, [ steps, complete, setIsReady ] )

    return isReady;

}

export const useReadyStep = ( step ) => {

    const [ { ready: { complete } } ,dispatch ] = useStoreContext();

    const [ [ addStep, completeStep, removeStep, uncompleteStep ] ] = useState([
        // add
        () => dispatch(gsa( ADD_READY_STEP, step )),
        // complete
        () => dispatch(gsa( COMPLETE_READY_STEP, step )),
        // remove
        () => dispatch(gsa( REMOVE_READY_STEP, step )),
        // uncomplete
        () => dispatch(gsa( UNCOMPLETE_READY_STEP, step ))
    ]);

    const [ isComplete, setIsComplete ] = useState(false);

    useEffect(() => {

        addStep();

        return () => removeStep();

    }, [step, addStep, removeStep]);

    useEffect(() => {

        setIsComplete( complete.includes(step) );

    }, [step, complete, setIsComplete]);

    return [ completeStep, uncompleteStep, isComplete ];

}