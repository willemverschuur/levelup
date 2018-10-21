import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


declare var $: any;


@Component({
  selector: 'app-widget-navbar',
  templateUrl: './widget-navbar.component.html',
  styleUrls: ['./widget-navbar.component.css']
})


export class WidgetNavbarComponent implements OnInit
{



  constructor(
      private _console: ConsoleService,
      public _state: StateService,
      private _router: Router

  ) {

  }


  ngOnInit()
  {
  }


  public redirect(link)
  {
    console.log(link);
    $("#navbarNavDropdown").removeClass('show');
    this._router.navigate([link]);
  }

}