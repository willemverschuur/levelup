import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageHomeComponent } from './page-home/page-home.component';
import { WidgetNavbarComponent } from './widget-navbar/widget-navbar.component';
import { WidgetFooterComponent } from './widget-footer/widget-footer.component';
import { PageSearchComponent } from './page-search/page-search.component';
import { PageCoursedetailsComponent } from './page-coursedetails/page-coursedetails.component';
import { PageCartComponent } from './page-cart/page-cart.component';
import { PageCheckoutComponent } from './page-checkout/page-checkout.component';
import { PageContactusComponent } from './page-contactus/page-contactus.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageDashboardComponent } from './page-dashboard/page-dashboard.component';
import { PageCourseComponent } from './page-course/page-course.component';
import { PageProfileComponent } from './page-profile/page-profile.component';
import { PagePaygateComponent } from './page-paygate/page-paygate.component';
import { PageResetpasswordComponent } from './page-resetpassword/page-resetpassword.component';
import { PageCreatepasswordComponent } from './page-createpassword/page-createpassword.component';

@NgModule({
  
  declarations: [
    AppComponent,
    PageHomeComponent,
    WidgetNavbarComponent,
    WidgetFooterComponent,
    PageSearchComponent,
    PageCoursedetailsComponent,
    PageCartComponent,
    PageCheckoutComponent,
    PageContactusComponent,
    PageLoginComponent,
    PageRegisterComponent,
    PageDashboardComponent,
    PageCourseComponent,
    PageProfileComponent,
    PagePaygateComponent,
    PageResetpasswordComponent,
    PageCreatepasswordComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
  ],

  providers: [],

  bootstrap: [AppComponent]

})
export class AppModule { }
