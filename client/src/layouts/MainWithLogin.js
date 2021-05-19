import Main from "./Main";
import { LoginModal } from "components/Login"

const MainWithLogin = ({ children }) => {
    return (
        <div>
            <Main>{children}</Main>
            <LoginModal />
        </div>
    )
}

export default MainWithLogin;