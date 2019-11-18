import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateFormComponent } from './generate-form/generate-form.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';


const routes: Routes = [
  { path: 'home', component: GenerateFormComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'table', component: SpreadsheetComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
