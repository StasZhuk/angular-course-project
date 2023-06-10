import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { StorageService } from 'src/app/services/storage.service';
import { logout } from 'src/app/store/actions/auth.actions';
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

  constructor(
    private storageService: StorageService,
    private store: Store<AppStoreState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select(getUserSelector).subscribe((user) => {
      this.isAuth = !!user;
    });
  }

  onLoadData() {
    this.storageService.fetchRecipeData().subscribe();
  }

  onSaveData() {
    this.storageService.saveRecipeData();
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
