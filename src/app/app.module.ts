import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { NgxEchartsModule } from 'ngx-echarts';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';

import { environment } from 'src/environments/environment';

// import { MainComponent } from './pages/main/main.component';
// import { HelpComponent } from './pages/help/help.component';
// import { ContactComponent } from './pages/contact/contact.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
// import { AboutUsComponent } from './pages/about-us/about-us.component';
// import { AdminComponent } from './pages/admin/admin.component';
// import { StatsComponent } from './pages/stats/stats.component';
// import { SequenceComponent } from './games/sequence/sequence.component';
// import { ChalkboardComponent } from './games/chalkboard/chalkboard.component';
// import { ContinuumComponent } from './games/continuum/continuum.component';
// import { ColourMatchComponent } from './games/colour-match/colour-match.component';
// import { OddOneOutComponent } from './games/odd-one-out/odd-one-out.component';
// import { SpeedMatchComponent } from './games/speed-match/speed-match.component';
// import { MemoryMatrixComponent } from './games/memory-matrix/memory-matrix.component';
// import { GamesComponent } from './pages/games/games.component';
// import { LoginComponent } from './auth/login/login.component';
// import { SignupComponent } from './auth/signup/signup.component';
// import { ModifydataComponent } from './auth/modifydata/modifydata.component';

@NgModule({
  declarations: [
    AppComponent,
    // MainComponent,
    // HelpComponent,
    // ContactComponent,
    HeaderComponent,
    FooterComponent,
    // AboutUsComponent,
    // AdminComponent,
    // StatsComponent,
    // SequenceComponent,
    // ChalkboardComponent,
    // ContinuumComponent,
    // ColourMatchComponent,
    // OddOneOutComponent,
    // SpeedMatchComponent,
    // MemoryMatrixComponent,
    // GamesComponent,
    // LoginComponent,
    // SignupComponent,
    // ModifydataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    ToastrModule.forRoot(),
    FlexLayoutModule,
    MaterialModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
