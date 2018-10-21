import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


declare var $: any;


@Component({
  selector: 'app-page-coursedetails',
  templateUrl: './page-coursedetails.component.html',
  styleUrls: ['./page-coursedetails.component.css']
})


export class PageCoursedetailsComponent implements OnInit, AfterViewInit
{

  public _course;
  public _courseid;

  constructor(
    private _route: ActivatedRoute,
    private _console: ConsoleService,
    private _state: StateService,
    private _location: Location,
    private _cdref: ChangeDetectorRef
  )
  {

  }


  ngOnInit()
  {
    var courseid = this._route.snapshot.paramMap.get('id');
    this._console.debug("WidgetCoursedetailsComponent", `load course ${this._courseid}`);

    if (this._courseid != courseid)
    {
      this._courseid = courseid;
      this._course = this._state._coursebyid[this._courseid];

      $([document.documentElement, document.body]).animate({ scrollTop: 400}, 500);

    }
  }


  ngAfterViewInit()
  {
  }

  
  public addToCart(e)
  {
    var courseid = $(e.target).closest('div').attr('courseid');
    this._state.addToCart(courseid);
    this._course.alreadyAdded = !!this._state._cart[courseid];

    this._cdref.markForCheck();
  }


  public removeFromCart(e)
  {
    var courseid = $(e.target).closest('div').attr('courseid');
    this._state.removeFromCart(courseid);
    this._course.alreadyAdded = !!this._state._cart[courseid];

    this._cdref.markForCheck();    
  }


}