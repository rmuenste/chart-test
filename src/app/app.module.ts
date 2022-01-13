import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GoogleChartsModule } from 'angular-google-charts';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbModule,
    GoogleChartsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
