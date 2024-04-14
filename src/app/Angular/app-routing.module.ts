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
    // { path: 'faq', loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
  // { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  // { path: 'coming-soon', loadChildren: () => import('./coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },
  // { path: 'maintenance', loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  // { path: 'privacy-policy', loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  // { path: 'terms-and-conditions', loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then(m => m.TermsAndConditionsModule) },
  // { path: '404', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
