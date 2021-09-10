import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {
    constructor(private http: HttpClient) {

    }

    async postRequest(url: any, body: any) {
        return new Promise((resolve, reject) => {
            this.http.post(url, body, {headers: new HttpHeaders('Access-Control-Allow-Origin "*"')}).subscribe(res => {               
                resolve({hasError:false, msg: res});
            }, err => {
                resolve({hasError:true, msg: err.error});
            });
        })
    }

    public async getRequest(url: any) {
        return new Promise((resolve, reject) => {
            this.http.get(url,{headers: new HttpHeaders('Access-Control-Allow-Origin "*"')}).subscribe(res => {               
                resolve({hasError:false, msg: res});
            }, err => {
                resolve({hasError:true, msg: err.error});
            });
        })
    }

    async putRequest(url: any, body: any) {
        return new Promise((resolve, reject) => {
            this.http.put(url, body, {headers: new HttpHeaders('Access-Control-Allow-Origin "*"')}).subscribe(res => {               
                resolve({hasError:false, msg: res});
            }, err => {
                resolve({hasError:true, msg: err.error});
            });
        })
    }
}
