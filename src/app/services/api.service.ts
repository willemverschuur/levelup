import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConsoleService} from './console.service';


@Injectable({
  providedIn: 'root'
})


export class ApiService 
{

  private _url = 'http://skillzbookcollege.com:8443/SB-API/api';


  constructor( 

      private _console: ConsoleService,
      private _http: HttpClient

  ) { 

  }


  private callApi(endpoint, vars)
  {
    var url = `${this._url}/${endpoint}`;
    this._console.debug('api.callPI',  url + " " + JSON.stringify(vars));

    return this._http.post(
      url, 
      JSON.stringify(vars), 
      {}
    );
  }


  public storecourses()
  {
    this._console.debug('API', 'store');

    const data = {
      filter: ''
    }

    return this.callApi('store', data);
  }

    
  public login(login, password)
  {
    const data = {
      login: login,
      password: password
    }

    return this.callApi('login', data);
  }


  public updateProfile(authToken, values)
  {
    values["authToken"] = authToken;    
    return this.callApi('updateprofile', values);
  }


  public createpassword(token, name, contactno, password, confirmpassword)
  {
    var data = {

      token: token,
      name: name,
      contactno: contactno,
      password: password,
      confirmpassword: confirmpassword
      
    }

    return this.callApi('createpassword', data);
  }


  public resetPassword(token, password, confirmpassword)
  {
    var data = {
      token: token,
      password: password,
      confirmpassword: confirmpassword
    };

    return this.callApi('resetpassword', data);
  }


  public register(email)
  {
    const data = {
      email: email
    };

    return this.callApi('register', data);
  }


  public course(authToken, courseid)
  {
    const data = {
      "id": courseid,
      "authToken": authToken
    }
    
    return this.callApi('course', data);
  }


  public logout(authToken)
  {
    const data = {
      "authToken": authToken
    }
    
    return this.callApi('logout', data);
  }


  public mycourses(authToken)
  {
    const data = {
      authToken: authToken
    }

    return this.callApi('mycourses', data);
  }


  public checkout(authToken, cart)
  {
    const data = {
      authToken: authToken,
      cart: cart
    }

    return this.callApi('checkout', data);
  }

}
