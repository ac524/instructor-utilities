const options = {
    port: process.env.PORT || 3001,
    secret: process.env.JWT_SECRET || "more security please?",
    mongodb: process.env.MONGODB_URI || "mongodb://localhost/instructorutilities",
    publicUrl: process.env.PUBLIC_URL || "http://localhost:3000/",
    email: {
        from: process.env.SENDGRID_FROM,
        sgApiKey: process.env.SENDGRID_API_KEY,
    }
};

module.exports = ( key ) => options[key];