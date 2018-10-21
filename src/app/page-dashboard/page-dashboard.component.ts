import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../services/api.service';
import { ConsoleService } from '../services/console.service';
import { StateService } from '../services/state.service';


@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.css']
})


export class PageDashboardComponent implements OnInit 
{

  public _courses = [];
  public _dirty = false;


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
    this.initPageVars();

    this._route.queryParams.subscribe(params => {
      this._dirty = params['refresh'] == 'true';

      this._api.mycourses(this._state._authToken).subscribe(rc => {

        console.log(rc);
        
        var success = rc[0];
        var message = rc[1];
        var mycourses = rc[2];

        this._state._mycourses = mycourses;
        this._state.set('mycourses', JSON.stringify(mycourses));

        this.initPageVars();

      });
    });      
    
  }


  public initPageVars()
  {
    this._courses = [];

    var courses = this._state._mycourses;

    for (var idx = 0; idx < courses.length; idx++)
    {
      var course = courses[idx];
      this._courses.push(course);
    }
  }


  public openCourse(courseid)
  {
    this._state.setOpenCourse(courseid);
    this._router.navigate(['/course']);
  }

}
