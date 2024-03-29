import {StrictMode} from "react";
import ReactDOM from 'react-dom';
import { StoreProvider } from "./store";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './utils/serviceWorker';
import { ModalProvider } from "components/Modal/store";

ReactDOM.render(
    <StrictMode>
        <StoreProvider>
            <ModalProvider>
                <Router>
                    <App />
                </Router>
            </ModalProvider>
        </StoreProvider>
    </StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();