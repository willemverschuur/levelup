import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../services/api.service';
import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-page-resetpassword',
  templateUrl: './page-resetpassword.component.html',
  styleUrls: ['./page-resetpassword.component.css']
})


export class PageResetpasswordComponent implements OnInit 
{

  public _password;
  public _confirmpassword;
  public _token;
  public _message;
  public _posting = false;


  constructor(

    private _api: ApiService,
    public _console: ConsoleService,
    private _state: StateService,
    private _route: ActivatedRoute,
    private _location: Location,
    private _router: Router

  ) { 

  }

  ngOnInit() 
  {
      this._route.queryParams.subscribe(params => {
            this._token = params['token'];
        });
  }


  public save()
  {
    this._posting = true;
    
    this._api.resetPassword(this._token, this._password, this._confirmpassword).subscribe((rc) => {

      this._posting = false;
      var success = rc[0];
      this._message = rc[1];
      var data = rc[2];

      if (success)
      {
          var authToken = data["authToken"];
          var mycourses = data["mycourses"];
          var myprofile = data["myprofile"];

          this._state._authToken = authToken;
          this._state.setAuthToken(authToken);
          
          this._state._mycourses = mycourses;
          localStorage.setItem('mycourses', JSON.stringify(mycourses));
          
          this._state._myprofile = myprofile;
          localStorage.setItem('myprofile', JSON.stringify(myprofile));
          
          this._router.navigate(['/dashboard']);          
      }

    });

  }

}
