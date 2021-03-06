import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ExtensionInfo, ExtensionLanguage } from './models';
import { HN_CompNode } from '../models';

@Injectable()
export class ExtensionsService {

    constructor(private http: HttpClient, @Inject("BASE_API_URL") private baseUrl: string) { }

    listMyExtensions(): Observable<ExtensionInfo[]> {
        return this.http.get<ExtensionInfo[]>(`${this.baseUrl}/extensions/list`, { withCredentials: true });
    }

    fetchExtensionInfo(extensionId: number): Observable<ExtensionInfo> {
        return this.http.get<ExtensionInfo>(`${this.baseUrl}/extensions/${extensionId}`, { withCredentials: true });
    }

    createExtension(info: ExtensionInfo): Observable<ExtensionInfo> {
        return this.http.post<ExtensionInfo>(`${this.baseUrl}/extensions/new`, info, { withCredentials: true });
    }

    updateExtension(info: ExtensionInfo): Observable<ExtensionInfo> {
        return this.http.put<ExtensionInfo>(`${this.baseUrl}/extensions/${info.extensionId}`, info, { withCredentials: true });
    }

    deleteExtension(extensionId: number) {
        return this.http.delete(`${this.baseUrl}/extensions/${extensionId}`, { withCredentials: true });
    }

    getAvailableLanguages() {
        return this.http.get<ExtensionLanguage[]>(`${this.baseUrl}/extensions/languages`, { withCredentials: true });
    }

    getStartingNodes() {
        return this.http.get<HN_CompNode[]>(`${this.baseUrl}/extensions/startingNodes/list`, { withCredentials: true });
    }

    enableVisibleAtStartup(nodeId: number) {
        return this.http.get(`${this.baseUrl}/extensions/startingNodes/visible?node=${nodeId}`, { withCredentials: true });
    }
    disableVisibleAtStartup(nodeId: number) {
        return this.http.get(`${this.baseUrl}/extensions/startingNodes/invisible?node=${nodeId}`, { withCredentials: true });
    }

}