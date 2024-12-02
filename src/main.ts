import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PLATFORM_ID } from '@angular/core';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { jwtInterceptorFn } from './app/interceptors/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtInterceptorFn])
    ),
    { provide: PLATFORM_ID, useValue: 'browser' },

  ],
}).catch(err => console.error(err));
