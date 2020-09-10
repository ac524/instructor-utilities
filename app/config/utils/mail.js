const sgMail = require('@sendgrid/mail');
const mjml2html = require("mjml");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFileAsync = util.promisify( fs.readFile );

class Mail {

    isEnabled = false;
    from = "ac524.brown@gmail.com";
    viewDir = "app/views/email/";

    constructor() {

        if( process.env.SENDGRID_API_KEY ) {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            this.isEnabled = true;
        }

    }

    disabledSend() {
        return new Promise((resolve) => resolve(false));
    }

    async getView( view ) {

            const { html, errors } = mjml2html( await readFileAsync( path.join( this.viewDir, `${view}.mjml` ), "utf8") );
            
            // TODO Error handling/logging

            return html;
    }

    async send( view, data, options ) {

        if(!this.isEnabled) return this.disabledSend();

        try {

            return sgMail.send({
                from: this.from,
                html: await this.getView( view, data ),
                ...options
            });

        } catch(err) {

            // TODO Error handling/logging
            console.log(err);
            return this.disabledSend();

        }


    }

}

module.exports = new Mail();