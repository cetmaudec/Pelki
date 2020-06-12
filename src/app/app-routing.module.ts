import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MatchComponent } from './match/match.component';
import { ServiciosComponent } from './servicios/servicios.component';

import { AuthGuard } from './auth.guard';

/*

{ path: 'register', component:RegisterComponent},
  { path: 'forgetpass', component:UserforgetpassComponent },
  { path: 'forgetpass/:user', component: ForgetpassComponent },
  { path: 'forgetpass/password/:user', component: ChangepassComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
*/

const routes: Routes = [
	{ path: '', component:LoginComponent},
	{ path: 'register', component:RegisterComponent},
	{ path: 'forgetpassword', component:ForgotpasswordComponent},
	{ path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
  { path: 'perfil', component:PerfilComponent, canActivate: [AuthGuard]},
  { path: 'servicios', component:ServiciosComponent, canActivate: [AuthGuard]},
  { path: 'match', component:MatchComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
