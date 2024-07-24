const passportConfig = {
    credentials: {
        tenantID: "90fa3c34-b6c0-41fe-a858-d79bc5e909fa",
        clientID: "76ace2b1-2993-4b72-abaf-2b614c60fed2"
    },
    metadata: {
        authority: "login.microsoftonline.com",
        discovery: ".well-known/openid-configuration",
        version: "v2.0"
    },
    settings: {
        validateIssuer: true,
        passReqToCallback: true,
        loggingLevel: "info",
        loggingNoPII: true,
    },
    protectedRoutes: {
        music: {
            endpoint: "/api/music",
            delegatedPermissions: {
                read: ["Music.Read", "Music.ReadWrite"],
                write: ["Music.ReadWrite"]
            },
            applicationPermissions: {
                read: ["Music.Read.All", "Music.ReadWrite.All"],
                write: ["Music.ReadWrite.All"]
            }
        },
    }
}

module.exports = passportConfig;
