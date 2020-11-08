const options = require("../../../options");
const Strategy = require("./Strategy");

class SmtpStrategy extends Strategy {

    transport;

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

        this.transport = nodemailer.createTransport( transportOptions );

    }

}

module.exports = SmtpStrategy;