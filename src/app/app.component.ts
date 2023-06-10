import { Component, OnInit } from '@angular/core';

import { getSession } from './store/actions/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-course';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getSession())
  }
}
