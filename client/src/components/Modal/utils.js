import {
	DEREGISTER_MODAL,
	REGISTER_MODAL,
	SET_ACTIVE_MODAL,
	SET_ACTIVE_ROOM
} from "components/Modal/store/actions";
import { useModalContext } from "components/Modal/store";
import { useEffect, useMemo } from "react";

export const useModalRegistration = ( key, modalConfig ) => {
    
    const [ modalState, modalDispatch ] = useModalContext();

    useEffect(() => {
        modalDispatch({
            type: REGISTER_MODAL,
            payload: { 
                [ key ] : {
                    namespace: "default",  
                    ...modalConfig 
                } 
            }
        })
        return () => {
            modalDispatch({
				type: DEREGISTER_MODAL,
				payload: key
			});
        }
    }, []);

    return modalState
}

export const useOpenModal = ( key ) =>{

    const [, modalDispatch] = useModalContext();

	return useMemo(()=> ( props ) =>
		modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: {
                activeKey: key,
                props
            }
		}),[key]);

}
