import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ApiService } from '../services/api.service';
import { StateService } from '../services/state.service';
import { ConsoleService } from '../services/console.service';


declare var $: any;


@Component({
  selector: 'app-page-course',
  templateUrl: './page-course.component.html',
  styleUrls: ['./page-course.component.css']
})


export class PageCourseComponent implements OnInit 
{

  // constants
  public _translations = [ 
    
    {field: "data", label: "English"},
    {field: "data_af", label: "Afrikaans"},
    {field: "data_zu", label: "Zulu"},

  ]


  // details from localStorage
  public _course = null;
  public _coursecapture = null;
  public _languagefield = "data";


  // course state
  public _courseid;
  public _loading = false;


  // course position
  public _unitidx = 0;
  public _sessionidx = 0;


  // details extrapolated from localStorage
  public _coursename = null;
  public _cdetails = {};
  public _sessions = [];
  public _units = [];
  public _rc = [];
  public _activerc = [];
  public _showOptions = false;
  public _session;
  public _unit;
  public _sessiontitle;
  public _unittitle;
  public _unitdata = null;
  

  // ui variables
  public _successmessage;
  public _errormessage;
  public _sbc_mcq;


  constructor(

    private _console: ConsoleService,
    private _state: StateService,
    private _ref: ChangeDetectorRef,
    private _api: ApiService

  ) { 

  }


  ngOnInit() 
  {

    // check if this course is opencourse cancel if it is
    if (this._courseid == this._state._opencourseid) return;
    var courseid = this._courseid = this._state._opencourseid; 

    // check localstate holds course
    var scourse = this._state.course(courseid);


    if (!scourse)
    {
      this._loading = true;

      this._api.course(this._state._authToken, courseid).subscribe((rc) => {

        this._loading = false;
        var success = rc[0];
        var message = rc[1];
        this._course = rc[2];
        this._coursecapture = this._state.coursecapture(this._course._id);

        this._state.setCourse(courseid, this._course);
        this.initPageVars();

      });
    }
    else
    {
      this._course = JSON.parse(scourse);
      this._coursecapture = this._state.coursecapture(this._courseid); 
      this.initPageVars();
    }

  }


  public initPageVars()
  {
    this._cdetails = this._course.course;
    this._coursename = this._cdetails["name"];
    this._sessions = this._course.sessions;
    this._units = this._course.units;
    this._rc = this._course.rc;   
    
    var cc = this._coursecapture;
    this._unitidx = (cc["unitidx"]) ? cc["unitidx"] : 0;
    this._sessionidx = (cc["sessionidx"]) ? cc["sessionidx"] : 0;
    this._languagefield = (cc["language"]) ? cc["language"] : 'data';

    //var cc = this._state._opencoursecapture;

    this.initUnitVars();
  }

  public initUnitVars()
  {
    var session = this._session = this._sessions[this._sessionidx];
    var units = this._units[session._id];
    var unit = this._unit = units[this._unitidx];

    this._unittitle = unit.title;
    this._sessiontitle = session.title;


    var unitdata = this._unit.data;
    this._unitdata = unitdata = (unitdata) ? JSON.parse(unitdata) : {};
    this._activerc = this._rc[unit.unit_id];

    for (var idx = 0; this._activerc && idx < this._activerc.length; idx++)
    {
      var activerc = this._activerc[idx];
      activerc["translation"] = activerc[this._languagefield];
    }

    if (unit.lib == 'cs_multiplechoice')
    {
      if (this._coursecapture.mcq && this._coursecapture.mcq[unit.unit_id])
      {
        var correct = (this._unitdata._answer == this._coursecapture.mcq[unit.unit_id]);
        this._sbc_mcq = this._coursecapture.mcq[unit.unit_id];

        console.log(this._sbc_mcq);
        if (correct)
        {
          this._successmessage = "Correct Option Selected";
          this._errormessage = null;
        }
        else
        {
          this._successmessage = null;
          this._errormessage = "Incorrect Option Selected";
        }
        // render result and say whether answer is true or not
      }
      else
      {
        this._successmessage = null;
        this._errormessage = null;
        this._sbc_mcq = null;
      }
    }
    else
    {
      this._successmessage = null;
      this._errormessage = null;

    }
  }


  public nextPage()
  {
    var sessionidx = this._sessionidx;
    var session = this._sessions[sessionidx];
    var units = this._units[session._id];

    var unitidx = ++this._unitidx;
    if (unitidx > units.length-1)
    {
      var sessionidx = ++this._sessionidx;
      var session = this._sessions[sessionidx];
      units = this._units[session._id];
      unitidx = this._unitidx = 0;
    }

    this._coursecapture["sessionidx"] = this._sessionidx;
    this._coursecapture["unitidx"] = this._unitidx;
    this._state.setCourseCapture(this._courseid, this._coursecapture);
    this.initUnitVars();

    $([document.documentElement, document.body]).animate({ scrollTop: 0}, 500);
  }


  public prevPage()
  {
    if (!this._sessionidx && !this._unitidx) return;

    var sessionidx = this._sessionidx;
    var session = this._sessions[sessionidx];
    var units = this._units[session._id];

    var unitidx = --this._unitidx;
    if (unitidx < 0)
    {
      var sessionidx = --this._sessionidx;
      var session = this._sessions[sessionidx];
      units = this._units[session._id];
      unitidx = this._unitidx = units.length-1;
    }

    this._coursecapture["sessionidx"] = this._sessionidx;
    this._coursecapture["unitidx"] = this._unitidx;
    this._state.setCourseCapture(this._courseid, this._coursecapture);
    this.initUnitVars();
    $([document.documentElement, document.body]).animate({ scrollTop: 0}, 500);

  }


  public showOptions()
  {
    this._showOptions = !this._showOptions;
  }


  public openChapter(e)
  {
    var chapterid = e.target.id;
    for (var idx = 0; idx < this._sessions.length; idx++)
    {
      var session = this._sessions[idx];
      if (session._id == chapterid) break;
    }

    this._sessionidx = idx;
    this._unitidx = 0;

    this._coursecapture["sessionidx"] = this._sessionidx;
    this._coursecapture["unitidx"] = this._unitidx;
    this._state.setCourseCapture(this._courseid, this._coursecapture);

    this.initUnitVars();
    this._showOptions = false;
    $([document.documentElement, document.body]).animate({ scrollTop: 0}, 500);
  }


  public showTranslations(e)
  {
    var datafield = this._languagefield = e.target.id;

    for (var idx = 0; this._activerc && idx < this._activerc.length; idx++)
    {
      var activerc = this._activerc[idx];
      activerc["translated"] = activerc[this._languagefield];
    }

    this._coursecapture["language"] = datafield;
    this._state.setCourseCapture(this._courseid, this._coursecapture);

    this.initUnitVars();
    this._showOptions = false;
  }


  public mcqClicked(e)
  {
    var el = e.target;
    var option = el.value;

    if (!this._coursecapture['mcq']) this._coursecapture['mcq'] = {};
    this._coursecapture['mcq'][this._unit.unit_id] = option;
    this._state.setCourseCapture(this._courseid, this._coursecapture);

    this.initUnitVars();
  }

}
