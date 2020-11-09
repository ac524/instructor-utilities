const nodemailer = require("nodemailer");
const Strategy = require("./Strategy");

class SmtpStrategy extends Strategy {

    transporter;

    host;
    port;
    secure = false;
    pool = false;
    auth;

    constructor( { smtp, ...options } ) {

        super( options );

        // Deconstruct props for easier access.
        const {
            pool,
            host,
            port,
            secure,
            authUser,
            authPass
        } = smtp;

        // Required.
        this.host = host;
        this.port = port;

        // Optional.
        if( undefined !== pool ) this.pool = pool;
        if( undefined !== secure ) this.secure = secure;
        if( undefined !== authUser && undefined !== authPass) this.auth = { user: authUser, pass: authPass };

        if( !this.checkIsConfigured([ "host", "port" ]) ) return;

        const optionsReducer = ( options, key ) => {

            if( undefined === this[key] ) return options;

            return {
                ...options,
                [key]: this[key]
            }

        }

        const transportOptions = [ "pool", "host", "port", "secure", "auth" ].reduce( optionsReducer, {} );

        this.transporter = nodemailer.createTransport( transportOptions );

    }

    async send( options ) {

        return await this.transporter.sendMail({
            from: this.from,
            ...options
        })

    }

}

module.exports = SmtpStrategy;