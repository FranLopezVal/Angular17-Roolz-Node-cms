import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseModel } from "../Models/Response.model";
import { Observable } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export abstract class GenericService {
    _http: HttpClient
    constructor(http: HttpClient) {
        this._http = http;
    }

    protected get<T>(url: string, params: HttpParams): Observable<ResponseModel<T>> {
        return this._http.get<ResponseModel<T>>(url, { params: params });
    }

    protected post<T>(url: string, body: any): Observable<ResponseModel<T>> {
        return this._http.post<ResponseModel<T>>(url, body);
    }

    // protected put<T>(url: string, body: any): Observable<ResponseModel<T>>;

    // protected delete<T>(url: string, params: any): Observable<ResponseModel<T>>;

    // protected patch<T>(url: string, body: any): Observable<ResponseModel<T>>;

    // public abstract head<T>(url: string, params: any): Observable<ResponseModel<T>>;

    // public abstract options<T>(url: string, params: any): Observable<ResponseModel<T>>;

}