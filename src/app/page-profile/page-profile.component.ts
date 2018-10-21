import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


import { ApiService } from '../services/api.service';
import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})


export class PageProfileComponent implements OnInit
{

  public _profile = {};
  public _email;
  public _name;
  public _telno;
  public _posting = false;
  public _message = "";


  constructor(

    private _api: ApiService,
    public _console: ConsoleService,
    private _state: StateService,
    private _router: Router

  ) { 

  }


  ngOnInit() 
  {
    this._profile = this._state._myprofile;

    this._email = this._profile["email"];
    this._telno = this._profile["telno"];
    this._name = this._profile["systemname"];
  }


  public initPageVars()
  {

  }


  public save()
  {

    this._posting = true;


    this._api.updateProfile(this._state._authToken, {
      email: this._email,
      telno: this._telno,
      systemname: this._name
    }).subscribe((rc) => {
      
      this._posting = false;
      var success = rc[0];
      this._message = rc[1];
      var data = rc[2];

      if (success)
      {
    
        this._state._myprofile = data;
        this._state.set('myprofile', JSON.stringify(data));
      }

    });
  }


  public logout()
  {
    this._api.logout(this._state._authToken).subscribe(data => {

      var storecourses = localStorage.getItem("storeCourses");
      this._state._authToken = null;
      localStorage.clear();
      localStorage.setItem("storeCourses", storecourses);
      this._router.navigate(["/home"]);

    });    
  }

}
