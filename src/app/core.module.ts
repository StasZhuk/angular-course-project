import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LogService } from 'src/app/services/log.service';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

@NgModule({
  providers: [
    LogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
