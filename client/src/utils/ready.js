import { useStoreContext, getStoreAction as gsa } from "../store";
import { ADD_READY_STEP, COMPLETE_READY_STEP, REMOVE_READY_STEP, UNCOMPLETE_READY_STEP } from "../store/actions"

export const useIsReady = () => {

    const [ { ready: { complete, steps } } ] = useStoreContext();

    return !steps.length || steps.every( step => complete.includes( step ) );

}

export const useReadyStep = ( step ) => {

    const [ ,dispatch ] = useStoreContext();

    return [
        // add
        () => dispatch(gsa( ADD_READY_STEP, step )),
        // complete
        () => dispatch(gsa( COMPLETE_READY_STEP, step )),
        // remove
        () => dispatch(gsa( REMOVE_READY_STEP, step )),
        // uncomplete
        () => dispatch(gsa( UNCOMPLETE_READY_STEP, step ))
    ]

}