class RouteError extends Error {

    constructor(statusCode, message, data) {

        super();
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;

    }

    get response() {
        return {
            default: this.message,
            ...this.data
        }
    }

}

const handleRouteError = (err, res) => {

    const { statusCode, response } = err;

    res.status( statusCode ).json( response );

};

module.exports = {
    RouteError,
    handleRouteError
}