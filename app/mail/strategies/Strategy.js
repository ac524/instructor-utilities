class Strategy {
    
    isConfigured;

    from;

    constructor( { from } ) {

        this.from = from;

        this.checkIsConfigured([ "from" ]);

    }

    checkIsConfigured( props ) {

        // If validation has already failed, skip additional checks.
        if( false === this.isConfigured ) return false;

        for( let i=0; i < props.length; i++ ) {

            if( undefined === props[i] ) {
                this.isConfigured = false;
                return false;
            }

        }

        if( !this.isConfigured ) this.isConfigured = true;

        return true;

    }

    send() {
        return new Promise((resolve) => resolve(false));
    }

}

module.exports = Strategy;