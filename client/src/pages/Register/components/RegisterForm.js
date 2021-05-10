import api from "utils/api";
import { useLogin, validateUserData, validateRegistrationData } from "utils/auth";
import Form from "components/Form";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {

    const login = useLogin();
    const history = useHistory();

    const handleSubmit = async (data, setErrors) => {

        try {

            await api.register(data);

            // Auto Login after registration
            await login( {
                email: data.email,
                password: data.password
            } );
            
            history.push("/");

        } catch( err ) {

            if( err.response.data ) setErrors( { ...err.response.data, default: "An error occured, please review." } );

        }

    }

    return <Form
            flat
            fields={[
                {
                    label: "Registration Code",
                    type:"text",
                    name: "code"
                },
                {
                    label: "Classroom Name",
                    type:"text",
                    name: "roomname"
                },
                {
                    label: "Your Name",
                    name: "name"
                },
                {
                    label: "Email",
                    type:"email",
                    name: "email"
                },
                {
                    label: "Password",
                    type:"password",
                    name: "password"
                },
                {
                    label: "Confirm Password",
                    type:"password",
                    name: "password2"
                }
            ]}
            validation={[validateUserData, validateRegistrationData]}
            buttonText="Sign Up"
            onSubmit={handleSubmit}
            />;

}

export default RegisterForm;