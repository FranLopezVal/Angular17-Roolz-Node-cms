import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { E_UserRoutesList } from '../../Core/Enums/RoutesList';
import { LoginComponent } from './Login/login.component';

const routes: Routes = [
    // { path: 'user', loadChildren: () => import('./user.module').then(m => m.UserModule) } // If want module child
    {
        path: E_UserRoutesList.Login,
        resolve: {
            // component: LoginResolver
        },
        data:  {

        },
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
