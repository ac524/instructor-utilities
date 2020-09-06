import React from "react";
import Main from "./Main";
import { LoginModal } from "../components/Login"
import { ModalProvider } from "../components/Modal";

function MainWithLogin({ children }) {
    return (
        <ModalProvider>
            <Main>{children}</Main>
            <LoginModal />
        </ModalProvider>
    )
}

export default MainWithLogin;