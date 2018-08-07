import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class HttpService1 {
    constructor(private http: Http) {

    }

    logStatusChange(status: string) {
        console.log(status);
    }

    getHttpWatchContent(url: string){
        return this.http.get(url);
    }
}