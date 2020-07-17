import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from  '@angular/material';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
//import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
         MatSortModule, MatTableModule } from "@angular/material";
import { MatSliderModule } from '@angular/material/slider';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { HomeMaestranzaComponent } from './home-maestranza/home-maestranza.component';
import { HomeClienteComponent } from './home-cliente/home-cliente.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MatchComponent } from './match/match.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { PerfilMaestranzaComponent } from './perfil-maestranza/perfil-maestranza.component';
import { ChangeImageComponent } from './change-image/change-image.component';
import { ServiciosMaestranzaComponent } from './servicios-maestranza/servicios-maestranza.component';
import { ServiciosClienteComponent } from './servicios-cliente/servicios-cliente.component';

import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material';



export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ForgotpasswordComponent,
        HomeComponent,
        HomeMaestranzaComponent,
        HomeClienteComponent,
        NavbarComponent,
        PerfilComponent,
        MatchComponent,
        ServiciosComponent,
        PerfilClienteComponent,
        PerfilMaestranzaComponent,
        ChangeImageComponent,
        ServiciosMaestranzaComponent,
        ServiciosClienteComponent
    ], 
    entryComponents: [
        ChangeImageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientInMemoryWebApiModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule ,
        MatSliderModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatDialogModule,
        FormsModule,    
        MatSlideToggleModule,
        //AngularSvgIconModule,
        //NgxPaginationModule
    ],
    providers: [
        AuthService,
        AuthGuard,  
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
