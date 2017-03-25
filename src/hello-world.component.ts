import { Component } from '@angular/core';

@Component({
  selector: 'p-datatable-hello-world',
  template: 'Hello world from the {{ projectTitle }} module!'
})
export class HelloWorldComponent {
  projectTitle: string = 'PrimeNG DataTable Extensions';
}
