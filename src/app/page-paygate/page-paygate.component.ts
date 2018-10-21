import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';
import { ApiService } from '../services/api.service';


declare var $: any;



@Component({
  selector: 'app-page-paygate',
  templateUrl: './page-paygate.component.html',
  styleUrls: ['./page-paygate.component.css']
})
export class PagePaygateComponent implements OnInit {


  private _payrequestid = null;
  private _checksum = null;
  private _loading = true;

  constructor(

    private _router: Router,
    private _console: ConsoleService,
    public _state: StateService,
    public _api: ApiService

  ) {

}


ngOnInit()
{
    var authToken = this._state._authToken;
    var cart = this._state._cart;

    this._api.checkout(authToken, cart).subscribe(rc => {

      console.log(rc);

      var success = rc[0];
      var msg = rc[1];
      var data = rc[2];

      console.log(data);

      if (success)
      {
        $("#paygate_payrequestid").val(data["PAY_REQUEST_ID"]);
        $("#paygate_checksum").val(data["CHECKSUM"]);
        $("#paygate_redirectform").submit();
      }

    },

    error => {

      this._router.navigate(["/cart"]);

      console.log("PayGate Error");
      console.log(error);

    });
  }



}
