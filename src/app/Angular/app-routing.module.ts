/**
 * CopyRight (C) 2024 Francisco Lopez
 * Proyecto de Git: https://github.com/FranLopezVal
 * Creado como parte de portafolio de Francisco.
 * 
 * Si usas este código por favor respeta los derechos de autor. (da crédito al autor :D)
 * Este proyecto es de uso libre para fines educativos.
 * 
 * Os quiero mucho.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth.guard';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { containerviewComponent } from '../Modules/NodeViewer/containerview.component';

const routes: Routes = [
  // { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {
    path: 'user',
    loadChildren: () => import('../Modules/User/user.module').then(m => m.UserModule),
    canActivate: [canActivate],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['user/login']) }
  },
  {
    path: 'app',
    component: containerviewComponent,
    canActivate: [canActivate],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['user/login']) }
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
