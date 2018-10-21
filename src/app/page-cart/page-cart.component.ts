import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.css']
})


export class PageCartComponent implements OnInit {

  public _courses = [];
  public _total = null;


  constructor(

    private _console: ConsoleService,
    public _state: StateService,
    private _router: Router

  ) { 

  }


  ngOnInit() {

    this.initPageVars();

  }


  public initPageVars()
  {
    this._courses = [];
    let total = 0;

    var cart = this._state._cart;

    for (var courseid in cart)
    {
      var course = this._state._coursebyid[courseid];
      this._courses.push(course);
      total += course.price;
    }

    this._total = +total;
  }


  public removeItem(courseid)
  {
    this._state.removeFromCart(courseid);
    this.initPageVars();
  }


  public checkout()
  {
    // check if logged in, redirect to login screen
    if (!this._state._authToken)
    {
      this._router.navigate(["/login"]);
      return;
    }

    // redirect to pay screen
    this._router.navigate(["/paygate"]);
  }

  public viewDetails(courseid)
  {
    this._router.navigate(["/coursedetails/"+courseid]);
  }

}
