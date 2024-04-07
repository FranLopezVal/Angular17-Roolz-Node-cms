import { Injectable } from "@angular/core";
import { GenericService } from "./generic.service";
import { ResponseModel } from "../Models/Response.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ILiteSessionInfo } from "../Models/Session.model";
import { SESSION_SCOPES } from "../Enums/API";



@Injectable({
    providedIn: 'root'
})
export class SessionService extends GenericService {
    
    constructor(private http: HttpClient) {
        super(http);
    }

    public getConnectionInfo(): Observable<ResponseModel<ILiteSessionInfo>> {
        return this.get<ILiteSessionInfo>(SESSION_SCOPES.LITE_CONNECTION_INFO, new HttpParams());
    }
}