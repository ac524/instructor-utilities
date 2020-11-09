const nodemailer = require("nodemailer");
const Strategy = require("./Strategy");

/**
 * @param {SmtpStrategy} strategy 
 * @param {string} url 
 */
const urlConfig = (strategy, url) => {

    strategy.url = url;

    strategy.transporter = nodemailer.createTransport( strategy.url );

}

/**
 * @param {SmtpStrategy} strategy 
 * @param {object} param1 
 */
const optionsConfig = (strategy, { pool, host, port, secure, authUser, authPass }) => {
    
    // Required.
    strategy.host = host;
    strategy.port = port;

    // Optional.
    if( undefined !== pool ) strategy.pool = pool;
    if( undefined !== secure ) strategy.secure = secure;
    if( undefined !== authUser && undefined !== authPass) strategy.auth = { user: authUser, pass: authPass };

    if( !strategy.checkIsConfigured([ "host", "port" ]) ) return;

    const optionsReducer = ( options, key ) => {

        if( undefined === strategy[key] ) return options;

        return {
            ...options,
            [key]: strategy[key]
        }

    }

    const transportOptions = [ "pool", "host", "port", "secure", "auth" ].reduce( optionsReducer, {} );

    strategy.transporter = nodemailer.createTransport( transportOptions );

}

class SmtpStrategy extends Strategy {

    transporter;

    url;

    host;
    port;
    secure = false;
    pool = false;
    auth;

    constructor( { smtp, ...options } ) {

        super( options );

        if( smtp.url )

            urlConfig( this, smtp.url );

        else

            optionsConfig( this, smtp );

    }

    async send( options ) {

        return await this.transporter.sendMail({
            from: this.from,
            ...options
        })

    }

}

module.exports = SmtpStrategy;