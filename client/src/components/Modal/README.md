# Modal Registration and Other Uses Guide
 A guide to help other developers useModalRegistration hook, to register the intense of each modal used on project to ModalState.

## Table of Contents

* [**Modal Configuration Steps**](#modal-configuration-steps)
    * [Step 1:Modal Registration](#step-1-modal-registration)

    * [Step 2: Create a Custom Hook](#step-2-create-a-custom-hook)

    * [Step 3: Call Custom Hook](#step-3-call-custom-hook)

* [**Modal Activation Steps**](#modal-Activation-steps)
    * [Step 1: Components that Activate Modal](#step-1-components-that-activate-modal)

    * [Step 2: Create a Button or Link Component](#step-2-create-abutton-or-link-component)

    * [Step 3: Call Button](#step-3-call-button)


## **Modal Configuration Steps:**

* #### **Step 1:** Modal Registration
    * useModalRegistration hook takes in two parameters, a ```key:String```, and ```modalConfig:Object```.

        * ```key:String```: string, used as a key for each modal intense register
            ```
            const modalKey = "LOGIN_MODAL"
            useModalRegistration(modalKey, modalConfig)
            ```
        * ```modalConfig:Object```:** An object that contains modal configurations

            **modalConfig Properties:**
            * ```key : {String}```: modal string based key
            * ```namespace: {String}```: string, namespace of modal to render the content that is been register.  
                * note - provide `namespace:dashboard` only if modal need use dashboard context. 
            * ```component: {Functional Component}```: component that will be used to render as Modal body when activated
            ```
            {
                key: modalKey,
                namespace:"dashboard"
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
            }
            ```
    * All steps out together should look as showed below
        ```
        useModalRegistration(modalKey, {
            key: modalKey,
            namespace:"dashboard",
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
        ```  
* #### **Step 2:** Create a Custom Hook
    * Custom hook should help ease registration of Modal by using ```useModalRegistration()```. See step one to see how to use,```useModalRegistration()``` hook

    * Import ```useModalRegistration``` from             ```client\src\components\Modal\utils.js```.

    * Name the hook to target what modal that is going to be register. For example Login Modal uses ```useLoginModal```

    * Example of simple custom hook at ```client\src\components\Login.js```
        * note: useLoginModal(), does not include `namespace:"dashboard"` since there no use of `dashboardContext`, and it will use the default namespace provided.  
        *   ```
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
            ```
* #### **Step 3:** Call Custom Hook
    * Custom hook Is called where the modal need to appear, as showed below,  ```MainWithLogin``` calls ```useLoginModal()``` 

        *   ```
            client\src\layouts\MainWithLogin.js

            import Main from "./Main";
            import { useLoginModal } from "components/Login";

            const MainWithLogin = ({ children }) => {

                useLoginModal();

                return <Main>{children}</Main>
                
            }
            export default MainWithLogin;

            ``` 
    
## **Modal Activation Steps:**

* #### **Step 1:** Components that activate Modal 

    * Modal Activation is simple, Modal has two ways to activate with a ```<ModalButton/>``` or a ```<ModalLink/>```. Both components use ```useOpenModal()``` that sets modalKey as the activeKey in ModalState. For example

        * ``` 
            export const ModalLink = ({ children, onClick, modalKey, ...props }) => {

                const openModal = useOpenModal(modalKey);

                const onLinkClick = () => {
                    onClick ? onClick(openModal) : openModal();
                };

                return (
                    <a role="button" onClick={onLinkClick} {...props}>
                        {children || "Launch Modal"}
                    </a>
                );
            };  
            ```  
* #### **Step 2:** Create a Button or Link Component
    * Create a Button or Link that passes down a ```modalKey``` to activate the modal, for example. ```LoginButton```, passes down ```"LOGIN_MODAL"``` as ```modalKey={modalKey}```

        **Note:** key of Modal when passed down; should be named ```modalKey``` when using key in react, the ```prop.key``` will be ignore

        *   ```
            export const LoginButton = ({ children, ...props }) =>{
                const modalKey = "LOGIN_MODAL"
                return (
                    <ModalButton {...props} modalKey={modalKey}>
                        {children || "Login"}
                    </ModalButton>
                );
            }

* #### **Step 3:** Call Button 
    * Now just pop the button link component, where you need that Modal to appear for example  ```LoginButton``` is used in ```TopNavbar```, which is called by ```MainWithLogin```

        *   ```
            client\src\layouts\components\TopNavbar.js

            <Container align="right">
            <Item renderAs="div">

                { 
                    isAuth ? 
                        <LogoutButton color="primary" outlined /> 
                    : 
                        <LoginButton color="primary"/> 
                }
            </Item>
            </Container>
            ```



    