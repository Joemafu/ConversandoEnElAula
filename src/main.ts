import { bootstrapApplication } from '@angular/platform-browser';
	import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
	import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
	import { IonicModule } from '@ionic/angular';
	import { importProvidersFrom } from '@angular/core';

	import { routes } from './app/app.routes';
	import { AppComponent } from './app/app.component';
	import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
	import { getAuth, provideAuth } from '@angular/fire/auth';
	import { getFirestore, provideFirestore } from '@angular/fire/firestore';
	import { getStorage, provideStorage } from '@angular/fire/storage';
	import { firebaseConfig } from './environments/environment.prod';
	import { provideHttpClient } from '@angular/common/http';
	import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

	bootstrapApplication(AppComponent, {
	  providers: [
	    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	    provideIonicAngular(),
	    provideRouter(routes, withPreloading(PreloadAllModules)),
	    importProvidersFrom(IonicModule.forRoot({})),
	    provideHttpClient(),
	    provideFirebaseApp(() => initializeApp(firebaseConfig)),
	    provideAuth(() => getAuth()),
	    provideFirestore(() => getFirestore()),
	    provideStorage(() => getStorage()), provideAnimationsAsync(), provideAnimationsAsync()
	  ],
	})
	  .catch((err) => console.error(err));