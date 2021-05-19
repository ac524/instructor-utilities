import Main from "./Main";
import { LoginModal } from "components/Login"
import { ModalProvider } from "components/Modal/Modal";

const MainWithLogin = ({ children }) => {
    return (
        <div>
            <Main>{children}</Main>
            <LoginModal />
        </div>
    )
}

export default MainWithLogin;