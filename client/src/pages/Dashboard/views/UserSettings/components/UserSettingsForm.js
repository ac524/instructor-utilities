import Form from "components/Form";
import { useAuthorizedUser, validateUserData } from "utils/auth";
import api from "utils/api";
import { useStoreDispatch, getStoreAction as gsa } from "store";
import { UPDATE_USER } from "store/actions";

const validateUserSettingsData = validateUserData.extendNew({
    validators: {
        password: ({ password, password2 }) => {

            const errors = [];

            if (password || password2) {

                // TODO stronger password validation for both client and server.
                if (password.length < 6) errors.push(["password", "Password must be at least 6 characters"]);

                if( !password2 ) errors.push(["password2", "Confirm password is required"])

                else if ( password2 != password ) errors.push(["password2", "Confirm password must match"]);
            };

            if (errors.length) return Object.fromEntries(errors);
        }
    }
});

const UserSettingsForm = () => {

    const dispatch = useStoreDispatch();
    const user = useAuthorizedUser();

    const handleSubmit = async ( data, setErrors ) => {

        const updateList = Object.entries(data).filter(([key, value]) => {

            if( !value && ["password","password2"].includes( key ) ) return false;

            return value !== user[key];

        });

        if (updateList.length) {

            const updates = Object.fromEntries(updateList);

            dispatch(gsa(UPDATE_USER, updates));

            try {

                await api.updateUser(updates);

            } catch (err) {

                if (err.response) setErrors(err.response.data);
            }

        }

    }

    return <Form
            flat
            fields={[
                {
                    label: "Name",
                    value: user.name,
                    name: "name"
                },
                {
                    label: "Email",
                    value: user.email,
                    name: "email"
                },
                {
                    label: "Password",
                    type: "password",
                    name: "password"
                },
                {
                    label: "Confirm Password",
                    type: "password",
                    name: "password2"
                }
            ]}
            fieldValueSource={user}
            validation={validateUserSettingsData}
            onSubmit={handleSubmit}
            buttonText="Save"
        />;

}

export default UserSettingsForm;