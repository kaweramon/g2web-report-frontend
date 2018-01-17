import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {ReportComponent} from './report/report.component';
import {BudgetComponent} from "./budget/budget.component";

const APP_ROUTES: Routes = [
  { path: 'relatorio', component: ReportComponent },
  { path: '', component: BudgetComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
