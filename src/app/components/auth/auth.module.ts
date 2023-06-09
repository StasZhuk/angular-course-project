import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from 'src/app/components/auth/auth.component';
import { SharedModule } from 'src/app/shared.module';

const authRoutes: Route[] = [{ path: '', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [RouterModule.forChild(authRoutes), FormsModule, SharedModule],
})
export class AuthModule {}
