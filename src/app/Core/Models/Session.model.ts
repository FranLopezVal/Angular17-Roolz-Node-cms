/**
 * CopyRight (C) 2024 Francisco Lopez
 * Proyecto de Git: https://github.com/FranLopezVal
 * Creado como parte de portafolio de Francisco.
 * 
 * Si usas este código por favor respeta los derechos de autor. (da crédito al autor :D)
 * Este proyecto es de uso libre para fines educativos.
 * 
 * Os quiero mucho.
 */


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