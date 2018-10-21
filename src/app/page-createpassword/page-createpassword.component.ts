import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../services/api.service';
import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-page-createpassword',
  templateUrl: './page-createpassword.component.html',
  styleUrls: ['./page-createpassword.component.css']
})


export class PageCreatepasswordComponent implements OnInit 
{

  public _email;
  public _name;
  public _telno;
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
    this._api.createpassword(this._token, this._name, this._telno, this._password, this._confirmpassword).subscribe((rc) => {

      console.log(rc);
      this._posting = false;
      var success = rc[0];
      this._message = rc[1];
      var data = rc[2];

    });
  }

}
