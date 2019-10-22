import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataRuleReportComponent } from './components/data-rule-report/data-rule-report.component';
import { EditConfigComponent } from './components/edit-config/edit-config.component';


const routes: Routes = [
  { path: '', redirectTo: '/dataRuleReport', pathMatch: 'full' },
  { path: 'dataRuleReport', component: DataRuleReportComponent },
  { path: 'editConfig', component: EditConfigComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
