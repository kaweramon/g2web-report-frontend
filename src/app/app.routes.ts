import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ReportComponent} from './report/report.component';

const APP_ROUTES: Routes = [
  { path: 'relatorio-detalhado', component: ReportComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
