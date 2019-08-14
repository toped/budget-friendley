import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

const routes: Routes = [
    { path: '', component: AdminHomeComponent },
];

export const AdminRouterModule = RouterModule.forChild(routes);
