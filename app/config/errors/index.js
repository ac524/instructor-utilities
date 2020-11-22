class CrsmError extends Error {

    message;
    data;

    constructor(message, data) {

        super();
        this.message = message;
        this.data = data;

    }

}

class InvalidDataError extends CrsmError { };

class InvalidUserError extends CrsmError { };

class NotFoundError extends CrsmError { };

class RouteError extends CrsmError {

    statusCode;
    sourceErr;

    constructor(statusCode, message, data) {

        super( message, data );

        this.statusCode = statusCode;

    }

    get response() {
        return {
            default: this.message,
            ...this.data
        }
    }

    setSourceErr( sourceErr ) {

        this.sourceErr = sourceErr;
        return this;

    }

}


module.exports = {
    InvalidDataError,
    InvalidUserError,
    NotFoundError,
    RouteError
}