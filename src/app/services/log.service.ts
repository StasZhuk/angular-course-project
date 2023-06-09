import { Subject } from 'rxjs';

export class LogService {
  logServiceInit = new Subject<boolean>();

  public log(text: string | number) {
    console.log('Log: ' + text);
  }
}
