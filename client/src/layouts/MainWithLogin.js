import Main from "./Main";
import { useLoginModal } from "components/Modal/utils";

const MainWithLogin = ({ children }) => {

    useLoginModal();

    return <Main>{children}</Main>
    
}

export default MainWithLogin;