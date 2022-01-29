const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const secret = require("../../config/options")("secret");

const authorization = ({
    headers: { authorization }
}) => {

    // Nothing to do here
    if( !authorization ) return;

    // The token must start with "Bearer "
    if( authorization.substr(0, 7) !== "Bearer " )

        throw new AuthenticationError("Invalid Token");

    // Extract the token
    const token = authorization.slice(7);

    try {

        const authTokenData = jwt.verify(token, secret, { maxAge: 31556926 });

        // Decrypt the token and provide data as `user`
        return {
            authTokenData
        }

    } catch (err) {

        throw new AuthenticationError("Invalid Token")

    }
    
}

module.exports = authorization;