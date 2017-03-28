import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// import { AngularODataModule } from '../src';
import { DemoComponent } from './demo.component';
import { EmployeeGridODataComponent } from './employeeGridOData.component';
import { DataTableModule, DialogModule, PaginatorModule, TooltipModule, PanelModule } from 'primeng/primeng';

@NgModule({
  declarations: [ DemoComponent, EmployeeGridODataComponent ],
  exports: [ PanelModule, NoopAnimationsModule ],
  imports: [ FormsModule, BrowserModule, HttpModule, DataTableModule, TooltipModule, PaginatorModule, DialogModule, PanelModule, NoopAnimationsModule ],
  bootstrap: [ DemoComponent ]
})
export class DemoModule {}
