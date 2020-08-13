import Login from "../contollers/Login";

class LoginForm {

    /**
     * @param {Login} controller 
     */
    constructor( controller ) {

        this.login = controller;

        this.isProcessing = false;

        this.messageEl = $('#login-alert');
        this.formEl = $("#login-form");
        this.emailInputEl = $("#login-email");
        this.passwordInputEl = $("#login-password");
        this.submitButtonEl = $("#login-submit");

        this.formEl.on("submit", this.captureLoginSubmit.bind(this) );

    }

    setProcessing( isProcessing ) {

        this.isProcessing = isProcessing;
        this.submitButtonEl.prop("disabled", this.isProcessing);

    }
    
    captureLoginSubmit( e ) {
        
        e.preventDefault();

        // Exit if we are processing an existing request
        if( this.isProcessing ) return;

        const userData = {
            email: this.emailInputEl.val().trim(),
            password: this.passwordInputEl.val().trim()
        };
    
        if( !userData.email || !userData.password ) {
            this.displayError("Please provide an email and password")
            return;
        };
        
        this.setProcessing( true );

        this.login
            .submit(userData)
            .then(() => {
                this.emailInputEl.val("");
                this.passwordInputEl.val("");
                window.location.reload();
            })
            // TODO Add real error handling
            .catch(() => this.displayError("Unable to log in"))
            .always(() => {
                this.setProcessing( false );
            });

    }

    displayError( message ) {
        this.messageEl.text( message ).show();
    }

}

export default LoginForm;