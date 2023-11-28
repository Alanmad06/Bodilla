import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { menuService } from './services/menu.service';
import { trajeService } from './services/trajes.service';
import { registerService } from './services/register.service';
import { guestService } from './services/guests.service';
import { loginService } from './services/login.service';
import { ExcelService } from './services/excel.service';
import { recuerdosService } from './services/recuerdos.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      provideAuth(()=> getAuth()),
      provideStorage(()=> getStorage())
    ),
   
    menuService,trajeService,registerService , guestService , loginService , ExcelService , recuerdosService
  ],
};
