import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "process.env.REACT_APP_CLIENT_ID",
        authority: "process.env.REACT_APP_AUTHORITY",
        redirectUri: "/",
        postLogoutRedirectUri: "/",
        clientCapabilities: ["CP1"]
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {

            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const protectedResources = {
    apiTodoList: {
        endpoint: "http://localhost:5000/api/music",
        scopes: {
            read: [ "api://76ace2b1-2993-4b72-abaf-2b614c60fed2/Todolist.Read" ],
            write: [ "api://76ace2b1-2993-4b72-abaf-2b614c60fed2/Todolist.ReadWrite" ]
        }
    }
}

export const loginRequest = {
    scopes: [...protectedResources.apiTodoList.scopes.read, ...protectedResources.apiTodoList.scopes.write]
};