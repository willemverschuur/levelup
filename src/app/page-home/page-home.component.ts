import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

import { Router } from "@angular/router";



import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';
import { ApiService } from "../services/api.service";


@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})


export class PageHomeComponent implements OnInit {


  public _loading;
  public _courses = [];
  public _coursebyid = {};


  constructor(

    public _console: ConsoleService,
    public _state: StateService,
    public _api: ApiService,
    public _router: Router,
    private _cdref: ChangeDetectorRef

  ) { 

  }


  ngOnInit() {

    if (!this._state._storecourses.length)
    {
      this._loading = true;

      this._api.storecourses().subscribe(rc => {

        this._loading = false;

        var success = rc[0];
        var msg = rc[1];
        var courses = rc[2];

        if (success)
        {
          this._state.setStoreCourses(courses);
          this.initPageVars();
        }
      });
    }
    else
    {
      this.initPageVars();
    }    
  }


  public initPageVars()
  {

    // updated filtered courses based on search criteria
    this._courses = [];
    this._coursebyid = {};


    var cart = this._state._cart;
    var courses = this._state._storecourses;
    if (courses) for (var idx = 0; idx < courses.length; idx++)
    {
      var course = courses[idx];

      if (course.featuredcontent)
      {
        this._courses.push(course);
      }

      this._coursebyid[course._id] = course;
    }

    console.log(this._courses);
    this._cdref.markForCheck();
  }


  public addToCart(courseid)
  {
    this._state.addToCart(courseid);
    this._coursebyid[courseid].alreadyAdded = !!this._state._cart[courseid];

    this._cdref.markForCheck();
  }


  public removeFromCart(courseid)
  {
    this._state.removeFromCart(courseid);
    this._coursebyid[courseid].alreadyAdded = !!this._state._cart[courseid];

    this._cdref.markForCheck();    
  }


  public showDetails(courseid)
  {
    this._router.navigate([`/coursedetails/${courseid}`]);
    
    this._cdref.markForCheck();    
  }

}
