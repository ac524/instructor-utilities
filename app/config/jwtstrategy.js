const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const validateJwtPayload = require("./utils/validateJwtPayload");
const secret = require("./options")( "secret" );

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = new JwtStrategy(opts, validateJwtPayload);