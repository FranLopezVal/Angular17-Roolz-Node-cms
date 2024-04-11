const APIPREFIX = 'roolz/'

enum API_SCOPES {
    USER = APIPREFIX + 'user/',
    SESSION = APIPREFIX + 'session/',
}

export enum SESSION_SCOPES {
    LITE_CONNECTION_INFO = API_SCOPES.SESSION + 'liteConnectionInfo/',
    CONNECTION_INFO = API_SCOPES.SESSION + 'connectionInfo/',
    // LOGOUT = API_SCOPES.SESSION + 'logout/',
}

export enum USER_SCOPES {
    LOGIN = API_SCOPES.USER + 'login/',
    REGISTER = API_SCOPES.USER + 'register/',
    LOGOUT = API_SCOPES.USER + 'logout/',
}