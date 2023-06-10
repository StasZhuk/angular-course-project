import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { rootReducer } from './store-root.reducer';

@NgModule({
  imports: [StoreModule.forRoot(rootReducer)],
  exports: [StoreModule],
})
export class AppStoreModule {}
