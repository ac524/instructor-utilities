const mjml2html = require("mjml");
const fs = require("fs");
const util = require("util");
const path = require("path");
const getOption = require("../../options");
const { strategy, ...emailConfig } = getOption( "email" );
const homeUrl = getOption( "publicUrl" );

const readFileAsync = util.promisify( fs.readFile );

const disabledSend = () => new Promise((resolve) => resolve(false));

class Mail {

    strategy;
    viewDir = "app/views/email/";

    defaultData = {
        homeUrl
    }

    constructor( strategy, config ) {

        switch( strategy ) {
            case "sendgrid":
                const SendGridStrategy = require("./strategies/SendGridStrategy");
                this.strategy = new SendGridStrategy( config );
                break;
            case "smtp":
                const SmtpStrategy = require("./strategies/SmtpStrategy");
                this.strategy = new SmtpStrategy( config );
                break;
        }

    }

    get isEnabled() {

        return this.strategy && this.strategy.isConfigured;
        
    }

    async getView( view, data = {} ) {

            const mapData = template => Object.entries( { ...this.defaultData, ...data } ).reduce( ( renderedTemplate, entry ) => renderedTemplate.replace( new RegExp(`\\[${entry[0]}\\]`, "g"), entry[1] ), template );

            const { html, errors } = mjml2html( mapData( await readFileAsync( path.join( this.viewDir, `${view}.mjml` ), "utf8") ) );
            
            // TODO Error handling/logging

            return html;

    }

    async send( view, data, options ) {

        if( !this.isEnabled ) return disabledSend();

        try {

            return this.strategy.send({
                ...options,
                html: await this.getView( view, data )
            });

        } catch(err) {

            // TODO Error handling/logging
            console.log(err);
            return disabledSend();

        }

    }

}

module.exports = new Mail( strategy, emailConfig );