import Main from "./Main";
import { useLoginModal } from "components/Login";

const MainWithLogin = ({ children }) => {

    useLoginModal();

    return <Main>{children}</Main>
    
}

export default MainWithLogin;