import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportHomeComponent } from './components/report-home/report-home.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ReportHomeComponent,
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
