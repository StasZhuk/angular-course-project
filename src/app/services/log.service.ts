import { Injectable, EventEmitter } from '@angular/core'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logServiceInit = new Subject<boolean>()

  public log(text: string | number) {
    console.log('Log: ' + text);
  }
}
