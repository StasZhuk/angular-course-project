import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logServiceInit = new EventEmitter<boolean>()

  public log(text: string | number) {
    console.log('Log: ' + text);
  }
}
