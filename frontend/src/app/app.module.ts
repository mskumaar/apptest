import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './button-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent, ButtonRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	AgGridModule.withComponents([ButtonRendererComponent]),
	BrowserAnimationsModule,
  HttpClientModule,
  FormsModule,
     ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
