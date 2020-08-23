import React from "react";
import Main from "./Main";
import { LoginModalProvider, LoginModal } from "../components/Login"

function MainWithLogin({ children }) {
    return (
        <LoginModalProvider>
            <Main>{children}</Main>
            <LoginModal />
        </LoginModalProvider>
    )
}

export default MainWithLogin;