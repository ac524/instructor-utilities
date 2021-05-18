import { useModalContext } from "components/Modal";
import { REGISTER_MODAL } from "components/Modal/actions";
import { useEffect } from "react";

export const useModalRegistration = ( key, modalConfig ) => {
    
    const [ modalState, modalDispatch ] = useModalContext();

    useEffect(() => {
        modalDispatch({
            type: REGISTER_MODAL,
            payload: { 
                [ key ] : { 
                    key, 
                    ...modalConfig 
                } 
            }
        })
        return modalState
    }, []);

    return modalState
}

export const useSetModalKey = ( key ) =>{

    const [modalState, modalDispatch] = useModalContext();

    useEffect(() => {
		modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: key
		});
	}, []);

	return modalState;

}
