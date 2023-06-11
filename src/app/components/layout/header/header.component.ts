import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { logout } from 'src/app/store/actions/auth.actions';
import {
  fetchRecipes,
  saveRecipes,
} from 'src/app/store/actions/recipes.actions';
import { getUserSelector } from 'src/app/store/selectors/auth.selectors';
import { AppStoreState } from 'src/app/store/store-root.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuth: boolean = false;

  constructor(private store: Store<AppStoreState>) {}

  ngOnInit(): void {
    this.userSub = this.store.select(getUserSelector).subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  onLoadData() {
    this.store.dispatch(fetchRecipes());
  }

  onSaveData() {
    this.store.dispatch(saveRecipes());
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
