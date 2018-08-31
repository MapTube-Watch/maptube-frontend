import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

@Injectable()
export class ErrorService {

    error600(resource: string) {
        return `Error 600 - Requested resource ${resource} NOT FOUND!`
    }

    errorCheckNull(resource: any, errorString: string){
        if (resource != null){
            return resource
        } else {
            return this.error600(errorString)
        }
    }

    errorCheckZero(resource: any, errorString: string){
        if (resource != 0){
            return resource
        } else {
            return this.error600(errorString)
        }
    }

}