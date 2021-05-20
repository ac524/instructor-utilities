import Main from "./Main";
import { LoginForm } from "components/Login"
import { useModalRegistration } from "components/Modal/utils";
import { Box, Heading } from "react-bulma-components";
const modalKey = "LOGIN_MODAL"
const MainWithLogin = ({ children }) => {

    useModalRegistration(modalKey, {
		key: modalKey,
		component: () => (
			<Box className="py-5">
				<Heading renderAs="h2">Login</Heading>
				<hr />
				<LoginForm />
				<p className="mt-3 has-text-grey is-size-7">
					Don't have an account yet? <a href="/register">Register</a>
				</p>
			</Box>
		)
	});

    return (
        <div>
            <Main>{children}</Main>
        </div>
    )
}

export default MainWithLogin;