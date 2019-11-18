import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SpreadsheetComponent } from './spreadsheet/spreadsheet.component';
import { AppRoutingModule } from './app-routing.module';
import { GenerateFormComponent } from './generate-form/generate-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SpreadsheetComponent,
    GenerateFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
