const options = {
    port: process.env.PORT || 3001,
    secret: process.env.JWT_SECRET || "more security please?",
    mongodb: process.env.MONGODB_URI || "mongodb://localhost/instructorutilities",
    publicUrl: process.env.PUBLIC_URL || "http://localhost:3000",
    email: {
        strategy: process.env.EMAIL_STRATEGY,
        from: process.env.EMAIL_FROM,
        smtp: {
            url: process.env.SMTP_URL,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT && parseInt(process.env.SMTP_PORT),
            pool: process.env.SMTP_POOL && process.env.SMTP_POOL === "true",
            secure: process.env.SMTP_SECURE && process.env.SMTP_SECURE === "true",
            authUser: process.env.SMTP_AUTH_USER,
            authPass: process.env.SMTP_AUTH_PASS,
        },
        sgApiKey: process.env.SENDGRID_API_KEY,
    }
};

module.exports = ( key ) => options[key];