import { Component, OnInit } from '@angular/core';
import { ODataConfiguration, ODataPagedResult, ODataQuery, ODataService, ODataServiceFactory } from 'angular-odata-es5';
import { LazyLoadEvent } from 'primeng/primeng';
import { Employee } from '../test/employee';
import { NorthwindODataConfigurationFactory } from './NorthwindODataConfigurationFactory';

import { PrimeNGDataTableODataQueryExtensions } from '../src';

console.log('`EmployeeGridODataComponent` component loaded asynchronously');

@Component({
    templateUrl: './demo/employeeGridOData.component.html',
    selector: 'p-datatable-employee-grid-odata',
    providers: [ { provide: ODataConfiguration, useFactory: NorthwindODataConfigurationFactory }, ODataServiceFactory ]
})
export class EmployeeGridODataComponent implements OnInit {

    public sortMulti = false;

    public employees: Employee[] = [];

    public totalRecords: number;

    public filter: LazyLoadEvent;

    private odata: ODataService<Employee>;

    constructor(private odataFactory: ODataServiceFactory) {
        this.odata = this.odataFactory.CreateService<Employee>('Employees');
    }

    public ngOnInit() {
        console.log('hello `EmployeeGridODataComponent` component');
    }

    public changeSortMulti(event): void {
        this.sortMulti = event.currentTarget.checked;
    }

    public loadEmployeesLazy(event: LazyLoadEvent) {
        console.log('event = ' + JSON.stringify(event));
        this.filter = event;

        this.getPagedData(event);
    }

    private getPagedData(event: LazyLoadEvent) {
        const query: ODataQuery<Employee> = this.odata
            .Query()
            .Expand('Orders')
            .Select(['EmployeeID', 'FirstName', 'LastName', 'BirthDate', 'City', 'Orders']);

        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, event);

        query
            .ExecWithCount()
            .subscribe((pagedResult: ODataPagedResult<Employee>) => {
                    this.employees = pagedResult.data;
                    this.totalRecords = pagedResult.count;
                },
                (error) => {
                    console.log('getPagedData ERROR ' + error);
                });
    }
}
