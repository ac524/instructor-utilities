import { DEREGISTER_MODAL, REGISTER_MODAL, SET_ACTIVE_MODAL } from "components/Modal/store/actions";
import { useModalContext } from "components/Modal/store";
import { useEffect, useMemo } from "react";
import { Box, Heading } from "react-bulma-components";
import { LoginForm } from "components/Login";

/**
 * Modal Registration Hook, to help register each modal intense
 * @param {String} key - key to store the modalConfig
 * @param {Object} modalConfig - Component or any other configurations that the modal need to property render Modal Intense
 * @param {String} modalConfig.key - string to assign the modal intense
 * @param {mixed} modalConfig.component - Component for Modal
*/
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
				type: DEREGISTER_MODAL,
				payload: key
			});
        }
    }, []);

    return modalState
}

/**
 * Modal Open Hook, to help activate modal intense
 * @param {String} key - key to store as activeKey
*/
export const useOpenModal = ( key ) =>{

    const [, modalDispatch] = useModalContext();

	return useMemo(()=> () =>
		modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: key
		}),[key]);

}