import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp } from 'firebase/app';
import { SignInComponent } from './app/pages/sign-in/sign-in.component';
import { SignUpComponent } from './app/pages/sign-up/sign-up.component';
import { MapComponent } from './app/pages/map/map.component';
import { LiveViewComponent } from './app/pages/live-view/live-view.component';
import { AdminComponent } from './app/pages/admin/admin.component';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { importProvidersFrom } from '@angular/core';

// Firebase configuration
const firebaseConfig = {
  apiKey: environment.firebase.apiKey,
  authDomain: environment.firebase.authDomain,
  projectId: environment.firebase.projectId,
  storageBucket: environment.firebase.storageBucket,
  messagingSenderId: environment.firebase.messagingSenderId,
  appId: environment.firebase.appId,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Define routes
const appRoutes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'map', component: MapComponent },
  { path: 'match/:data', component: LiveViewComponent },
  { path: 'admin', component: AdminComponent },
];

// Bootstrap the standalone application
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch(err => console.error(err));
