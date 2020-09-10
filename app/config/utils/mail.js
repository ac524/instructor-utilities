const sgMail = require('@sendgrid/mail');
const mjml2html = require("mjml");
const fs = require("fs");
const util = require("util");
const path = require("path");

const readFileAsync = util.promisify( fs.readFile );

class Mail {

    from = "ac524.brown@gmail.com";

    async send( view, data, options ) {

        const { html, errors } = mjml2html( await readFileAsync(`app/views/email/${view}.mjml`, "utf8") );

        return sgMail.send({
            from: this.from,
            html,
            ...options
        });

    }

}

module.exports = new Mail();