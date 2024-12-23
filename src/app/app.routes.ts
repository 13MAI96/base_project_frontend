import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthGuard } from './services/session-guard/session.guard';
import { PortfolioComponent } from './modules/portfolio/portfolio.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'portfolio' 
    },
    {
        path: 'portfolio',
        component: PortfolioComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'layout',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canMatch: [AuthGuard]
    }
];
