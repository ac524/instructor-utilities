import LoginForm from "../components/LoginForm";

class Login {

    constructor() {

        this.loginForm = new LoginForm( this );

    }

    submit( credentials ) {

        return $.post( "/api/login", credentials );

    }

}

export default Login;