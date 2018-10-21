import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

import { Router } from "@angular/router";


import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';
import { ApiService } from "../services/api.service";


declare var $: any;


@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,  
})


export class PageSearchComponent implements OnInit 
{

  public _loading;
  public _courses = [];
  public _coursebyid = {};
  public _categories = [];
  public _searchstring;
  public _searchcategory;


  constructor(

    public _console: ConsoleService,
    public _state: StateService,
    public _api: ApiService,
    public _router: Router,
    private _cdref: ChangeDetectorRef

  ) { 

  }


  ngOnInit() 
  {
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

    // update categories based on loaded courses
    this._categories = this._state._coursecategories;


    // updated filtered courses based on search criteria
    this._courses = [];
    this._coursebyid = {};


    var cart = this._state._cart;
    var courses = this._state._storecourses;
    if (courses) for (var idx = 0; idx < courses.length; idx++)
    {
      var course = courses[idx];
      course.alreadyAdded = (!!cart[course._id]);

      var searchpass = (!this._searchstring || course.title.toLowerCase().indexOf(this._searchstring) != -1) 
      var categorypass = (course.category && course.category == this._searchcategory);
      if (!this._searchstring && this._searchcategory) searchpass = false;
      
      if (searchpass || categorypass)
      {
        this._courses.push(course);
      }

      this._coursebyid[course._id] = course;
    }

    this._cdref.markForCheck();
  }


  categoryChanged(event)
  {
    this._searchcategory = $(event.target).val();
    if (this._searchcategory == '--Select Category') this._searchcategory = '';
    this.initPageVars();
  }

  searchChanged(event) 
  {
    var searchString = event.target.value.toLowerCase();
    if (searchString == this._searchstring) return;
    this._searchstring = searchString;
    this.initPageVars();
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
    this._router.navigate([`/coursedetails/${courseid}`])

    this._cdref.markForCheck();    
  }

}