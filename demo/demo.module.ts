import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// import { AngularODataModule } from '../src';
import { DataTableModule, DialogModule, PaginatorModule, PanelModule, TooltipModule } from 'primeng/primeng';
import { DemoComponent } from './demo.component';
import { EmployeeGridODataComponent } from './employeeGridOData.component';

@NgModule({
  declarations: [DemoComponent, EmployeeGridODataComponent],
  exports: [PanelModule, NoopAnimationsModule],
  imports: [FormsModule, HttpClientModule, BrowserModule, HttpModule, DataTableModule, TooltipModule, PaginatorModule, DialogModule, PanelModule, NoopAnimationsModule],
  bootstrap: [DemoComponent]
})
export class DemoModule { }
