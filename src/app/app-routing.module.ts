
import { Routes } from '@angular/router';
import { AccountComponent } from './views/account-screen/account-screen';
import { NotfoundComponent } from './views/authentication/404/not-found.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { BackgroundComponent } from './views/background/blank.component';

export const Approutes: Routes = [
    {
        path: '',
        component: BackgroundComponent,
        children: [
            {
                path: '404',
                component: NotfoundComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'account',
                component: AccountComponent
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];
