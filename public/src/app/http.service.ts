import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' ;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

constructor(private _http: HttpClient) {
  this.getUser();
  this.getFarm();
 }
 getUser(){
   return this._http.get('/start');
 }
 getFarm(){
   return this._http.get('/farm');
 }
}