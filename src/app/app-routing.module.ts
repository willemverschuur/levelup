import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { PageCoursedetailsComponent } from './page-coursedetails/page-coursedetails.component';
import { PageCartComponent } from './page-cart/page-cart.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageContactusComponent } from './page-contactus/page-contactus.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PageCourseComponent } from './page-course/page-course.component';
import { PagePaygateComponent } from './page-paygate/page-paygate.component';
import { PageResetpasswordComponent } from './page-resetpassword/page-resetpassword.component';
import { PageCreatepasswordComponent } from './page-createpassword/page-createpassword.component';


const routes: Routes = [

  { path: '', component: PageHomeComponent },
  { path: 'home', component: PageHomeComponent },
  { path: 'search', component: PageSearchComponent },
  { path: 'coursedetails/:id', component: PageCoursedetailsComponent },
  { path: 'cart', component: PageCartComponent },
  { path: 'login', component: PageLoginComponent },
  { path: 'register', component: PageRegisterComponent },
  { path: 'contactus', component: PageContactusComponent },
  { path: 'dashboard', component: PageDashboardComponent },
  { path: 'profile', component: PageProfileComponent },
  { path: 'course', component: PageCourseComponent },
  { path: 'paygate', component: PagePaygateComponent },
  { path: 'resetpassword', component: PageResetpasswordComponent },
  { path: 'createpassword', component: PageCreatepasswordComponent }


];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}