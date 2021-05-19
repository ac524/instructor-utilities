import { useModalContext } from "components/Modal";
import { REGISTER_MODAL, SET_ACTIVE_MODAL } from "components/Modal/modalActons";
import { useEffect } from "react";

export const useModalRegistration = ( key, modalConfig ) => {
    
    const [ modalState, modalDispatch ] = useModalContext();

    useEffect(() => {
        modalDispatch({
            type: REGISTER_MODAL,
            payload: { 
                [ key ] : {  
                    ...modalConfig 
                } 
            }
        })
        return () => {
            modalDispatch({
				type: REGISTER_MODAL,
				payload: key
			});
        }
    }, []);

    return modalState
}

export const useOpenModal = ( key ) =>{

    const [, modalDispatch] = useModalContext();

	return useMemo(()=> () =>
		modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: key
		}),[key]);

}
