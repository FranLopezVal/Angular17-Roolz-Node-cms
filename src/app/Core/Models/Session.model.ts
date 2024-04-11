
// export interface ILiteSessionInfo {
//     PublicKey: string;
//     PrivateKey: string;
//     SessionId: string;
// }

export interface ISessionInfo {
    PublicKey: string;
    PrivateKey: string;
    SessionId: string;
    lastSessionStatus: USER_TOKEN_STATUS;
}

export enum USER_TOKEN_STATUS {
    NOT_LOGGED = 0,
    LOGGED = 1,
    EXPIRED = 2,
    REJECTED = 3
}