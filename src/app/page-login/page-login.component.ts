import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from '../services/api.service';
import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})


export class PageLoginComponent implements OnInit 
{

  public _loginemail = '';
  public _loginpassword = '';
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
  }


  public save()
  {
    
    this._posting = true;
    
    this._api.login(this._loginemail, this._loginpassword).subscribe((data) => {
        
        var stateService = this._state;
        this._posting = false;
        var success = data[0];
        var message = data[1];
        
        if (success)
        { 
          var authToken = data[2]["authToken"];
          var mycourses = data[2]["mycourses"];
          var myprofile = data[2]["myprofile"];
          
          this._posting = false;

          stateService._authToken = authToken;
          stateService.setAuthToken(authToken);
          
          stateService._mycourses = mycourses;
          localStorage.setItem('mycourses', JSON.stringify(mycourses));
          
          stateService._myprofile = myprofile;
          localStorage.setItem('myprofile', JSON.stringify(myprofile));
          
          this._router.navigate(['/dashboard']);
        }
        else
        { 
          this._posting = false;

          this._message = message;
        }
      
      }, (error) => {

        this._posting = false;
        this._message = "Connection Failed";
    
    });
  }


  public register()
  {
    this._router.navigate(["/register"]);
  }


}
