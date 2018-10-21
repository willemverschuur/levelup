import { Router } from "@angular/router";
import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { ConsoleService } from './console.service';


@Injectable({
  providedIn: 'root'
})


export class StateService 
{

  // data from API
  public _storecourses;
  public _mycourses;
  public _authToken;
  public _myprofile;


  // data populated locally
  public _coursebyid;
  public _coursecategories;
  public _cart;
  public _cartcount = 0;
  public _opencourseid;
  public _opencoursecapture;


  constructor( 
      private _api: ApiService, 
      private _router: Router,
      public _console: ConsoleService 

  ) { 

    var scourses = localStorage.getItem('storeCourses');
    var courses = (scourses) ? JSON.parse(scourses) : [];
    this.updateCourseCache(courses);

    var smycourses = localStorage.getItem("mycourses");
    this._mycourses = (smycourses) ? JSON.parse(smycourses) : [];

    var scart = localStorage.getItem("cart");
    this._cart = (scart) ? JSON.parse(scart) : {};
    this._cartcount = Object.keys(this._cart).length;


    this._authToken = localStorage.getItem("authToken");

    var sprofile = localStorage.getItem("myprofile");
    this._myprofile = (sprofile) ? JSON.parse(sprofile) : {};

    this._opencourseid = localStorage.getItem('opencourseid');
  }


  public setStoreCourses(courses)
  {
    localStorage.setItem('storeCourses', JSON.stringify(courses));
    this.updateCourseCache(courses);
  }


  public setCourse(courseid, course)
  {
      var key = `course_${courseid}`;
      localStorage.setItem(key, JSON.stringify(course));
  }


  public setAuthToken(authToken)
  {
    this._authToken = authToken;
    localStorage.setItem('authToken', authToken);
  }


  public setOpenCourse(courseid)
  {
    this._opencourseid = courseid;
    localStorage.setItem('opencourseid', courseid);
  }


  public coursecapture(courseid)
  {
    var storagekey = `coursecapture_${courseid}`;
    var scoursecapture = localStorage.getItem(storagekey);
    var coursecapture = (scoursecapture) ? JSON.parse(scoursecapture) : {};

    return coursecapture;
  }


  public setCourseCapture(courseid, coursecapture)
  {
    var storagekey = `coursecapture_${courseid}`;
    localStorage.setItem(storagekey, JSON.stringify(coursecapture));
  }


  public course(courseid)
  {
    var key = `course_${courseid}`;
    var scourse = localStorage.getItem(key);
    return scourse;
  }


  public updateCourseCache(courses)
  {
    this._storecourses = courses;
    this._coursebyid = {};
    this._coursecategories = {};

    for (var courseidx = 0; courseidx < courses.length; courseidx++) 
    {
      var course = courses[courseidx];
      this._coursebyid[course._id] = course;
      if (course.category) this._coursecategories[course.category] = true;
    }

    this._coursecategories = Object.keys(this._coursecategories);
  }


  public set(key, value)
  {
    localStorage.setItem(key, value);
  }


  public logout()
  {
    this._api.logout(this._authToken).subscribe(data => {

      var storecourses = localStorage.getItem("storecourses");
      this._authToken = null;
      localStorage.clear();
      localStorage.setItem("storecourses", storecourses);
      this._router.navigate(["/home"]);

    });
  }


  public addToCart(courseid)
  {
    if (courseid)
    {
      this._cart[courseid] = 1;
      localStorage.setItem('cart', JSON.stringify(this._cart));
    }
    
    this._cartcount = Object.keys(this._cart).length;
  }

  
  public removeFromCart(courseid)
  {   
    if (courseid && this._cart[courseid])
    {
      delete this._cart[courseid];
      localStorage.setItem('cart', JSON.stringify(this._cart));
    }

    this._cartcount = Object.keys(this._cart).length;
  }

}
