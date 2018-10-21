import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class ConsoleService 
{

  constructor() 
  { 
  }


  public success(scope, message)
  {
    console.log(`${scope} - success - %c${message}`, 'color:green');
  }


  public debug(scope, message)
  {
    console.log(`${scope} - debug - %c${message}`, 'color:blue');
  }


  public error(scope, message)
  {
    console.log(`${scope} - error -  %c${message}`, 'color:red');
  }
}
