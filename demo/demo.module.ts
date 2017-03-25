import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGDataTableExtensions } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, PrimeNGDataTableExtensions.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule {}