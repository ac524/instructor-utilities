import { useEffect } from "react";
import "./App.sass";

import LoadingOverlay from "./components/LoadingOverlay";
import Routes from "./components/Routes";

import { useAuthTokenStore } from "./utils/auth";
import { useIsReady, useReadyStep } from "./utils/ready";
import loadGlobalIcons from "./utils/icons";
import { useSocketConnection } from "./utils/socket.io";
import Fade from "./animations/Fade";
import { useUserSocketUpdates } from "utils/user";
import { ModalProvider } from "components/Modal/modalStore";

loadGlobalIcons();

const App = () => {

    useSocketConnection();

    const [ completeStep ] = useReadyStep("authcheck");

    const isReady = useIsReady();

    const isAuthCheckDone = useAuthTokenStore();

    useUserSocketUpdates();

    useEffect(() => {

        if( isAuthCheckDone ) completeStep();

    }, [isAuthCheckDone, completeStep]);
    
    return (
        <ModalProvider>
            {isAuthCheckDone ? <Routes /> : null}
            <Fade className="is-relative" show={!isReady} type="out" style={{zIndex: 100}}><LoadingOverlay /></Fade>
        </ModalProvider>
    )

}

export default App;