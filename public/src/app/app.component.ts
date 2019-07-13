import { Component } from '@angular/core';
import {HttpService} from './http.service' ;
import { Component, OnInit} from '@angular/core'  //Add oninit 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'public';
  user = {};

  constructor(private _httpService:HttpService){
  }
  ngOnInit() {
    this.getUserFromService()
  }
  getUserFromService(){
    let observable = this._httpService.getUser()
    observable.subscribe(data => {
      console.log("Got our user")
      console.log(data.data)
			this.user = data.data
		})
  }
  farm(){
    console.log("Head to the farm")
    let observable = this._httpService.getFarm()
    observable.subscribe(data =>{
      console.log("Got our gold from Farm!")
      console.log(data.data)
      this.user = data.data
    })

  }
}
