const sgMail = require("@sendgrid/mail");
const Strategy = require("./Strategy");

class SendGridStrategy extends Strategy {

    constructor( { sgApiKey, ...options } ) {

        super( options );

        // No need to continue if base configuration failed.
        if( !this.isConfigured ) return;

        if( !sgApiKey ) {

            // Invalidate configuration and exit.
            this.isConfigured = false;
            return;
            
        }

        // Apply the key
        sgMail.setApiKey( sgApiKey );

    }

    send( { from, html, ...options } ) {

        return sgMail.send({
            from: from || this.from,
            html,
            ...options
        });

    }

}

module.exports = SendGridStrategy;