import Signup from "../controllers/Signup";

class SignupForm {

    /**
     * 
     * @param {Signup} controller 
     */
    constructor( controller ) {

        this.signup = controller;

        this.isProcessing = false;

        this.formEl = $("#signup-form");
        this.emailInputEl = $("#signup-email");
        this.passwordInputEl = $("#signup-password");
        this.submitButtonEl = $("#signup-submit");

        this.formEl.on("submit", this.captureSignupSubmit.bind(this));
        
    }

    setProcessing( isProcessing ) {

        this.isProcessing = isProcessing;
        this.submitButtonEl.prop("disabled", this.isProcessing);

    }
    
    captureSignupSubmit( e ) {

        e.preventDefault();

        // Exit if we are processing an existing request
        if( this.isProcessing ) return;

        const userData = {
            email: this.emailInputEl.val().trim(),
            password: this.passwordInputEl.val().trim()
        };
    
        if( !userData.email || !userData.password ) {
            return;
        };
        
        this.setProcessing( true );

        this.signup
            .submit(userData)
            .then(() => {
                this.emailInputEl.val("");
                this.passwordInputEl.val("");
                window.location.replace("/");
            })
            // TODO Add real error handling
            .catch(() => console.log("Signup error"))
            .always(() => {
                this.setProcessing( false );
            });

    }

}

export default SignupForm;