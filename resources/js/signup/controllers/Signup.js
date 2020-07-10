import SignupForm from "../components/SignupForm";

class Signup {

    constructor() {

        this.signupForm = new SignupForm(this);

    }

    submit( newUserDetails ) {

        return $.post("/api/signup", newUserDetails);

    }

}

export default Signup;