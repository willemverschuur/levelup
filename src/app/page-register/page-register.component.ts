import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from '../services/api.service';
import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})


export class PageRegisterComponent implements OnInit 
{

  public _posting = false;
  public _registeremail = '';
  public _message;

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


  public register()
  {
    if (this._registeremail)
    {
      this._posting = true;
      this._api.register(this._registeremail).subscribe( (rc) => {
        
        this._posting = false;

        var success = rc[0];
        this._message = rc[1];
        var data = rc[2];

      }, (error) => {
        this._posting = false;
        this._message = "Failed";
      });
    }

  }

  public login()
  {
    this._router.navigate(["/login"]);
  }
}
