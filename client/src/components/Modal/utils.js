import { DEREGISTER_MODAL, REGISTER_MODAL, SET_ACTIVE_MODAL } from "components/Modal/store/actions";
import { useModalContext } from "components/Modal/store";
import { useEffect, useMemo } from "react";
import { Box, Heading } from "react-bulma-components";
import { LoginForm } from "components/Login";

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

export const useOpenModal = ( key ) =>{

    const [, modalDispatch] = useModalContext();

	return useMemo(()=> () =>
		modalDispatch({
			type: SET_ACTIVE_MODAL,
			payload: key
		}),[key]);

}

export const useLoginModal = () =>{
    const modalKey = "LOGIN_MODAL"
    useModalRegistration(modalKey, {
        key: modalKey,
        component: () => (
            <Box className="py-5">
                <Heading renderAs="h2">Login</Heading>
                <hr />
                <LoginForm />
                <p className="mt-3 has-text-grey is-size-7">
                    Don't have an account yet?{" "}
                    <a href="/register">Register</a>
                </p>
            </Box>
        )
    })
	
}