import { inject, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http, ConnectionBackend, HttpModule, Response, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SortMeta, LazyLoadEvent, FilterMetadata } from 'primeng/primeng';
import { ODataQuery, ODataConfiguration } from 'angular-odata-es5';
import { Employee } from './employee';

import { PrimeNGDataTableODataQueryExtensions } from '../src/primeNGDataTableODataQueryExtensions';

describe('PrimeNGDataTableODataQueryExtensions', () => {

    const config = new ODataConfiguration();

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                ODataConfiguration
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('applyLazyLoadEvent() top and skip', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            rows: 11,
            first: 12
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Top').and.returnValue(query);
        spyOn(query, 'Skip').and.returnValue(query);

        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Top).toHaveBeenCalledWith(11);
        expect(query.Skip).toHaveBeenCalledWith(12);
    });

    it('applyLazyLoadEvent() sortField', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            sortField: 'Name',
            sortOrder: 1
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'OrderBy').and.returnValue(query);

        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.OrderBy).toHaveBeenCalledWith('Name asc');
    });

    it('applyLazyLoadEvent() multiSortMeta', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            multiSortMeta: [
                { field: 'Name', order: 1 },
                { field: 'Last', order: 0 }
            ]
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'OrderBy').and.returnValue(query);

        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.OrderBy).toHaveBeenCalledWith('Name asc, Last desc');
    });

    it('applyLazyLoadEvent.Exec eq', inject([ Http, ODataConfiguration ], (http: Http, cfg: ODataConfiguration) => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'X': { 'value': '123', 'matchMode': 'eq' }
            }
        };

        spyOn(http, 'get').and.returnValue(Observable.of(Response));

        // Act
        const query = new ODataQuery<Employee>('Employees', cfg, http);
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);
        query.Exec();

        const matcherURLSearchParams = {
            asymmetricMatch: (params: URLSearchParams) => {
                expect(params.get('$filter')).toEqual('X eq 123');
                return true;
            }
        };

        expect(http.get).toHaveBeenCalledWith('http://localhost/odata/Employees', jasmine.objectContaining({
            search: matcherURLSearchParams
        }));
    }));

    it('applyLazyLoadEvent() year', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'X': { 'value': '2017', 'matchMode': 'year:eq' }
            }
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Filter');
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Filter).toHaveBeenCalledWith('year(X) eq 2017');
    });

    it('applyLazyLoadEvent() eq', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'X': { 'value': '123', 'matchMode': 'eq' }
            }
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Filter');
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Filter).toHaveBeenCalledWith('X eq 123');
    });

    it('applyLazyLoadEvent() length', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'City': { 'value': '7', 'matchMode': 'length:eq' }
            }
        };
        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Filter');
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Filter).toHaveBeenCalledWith('length(City) eq 7');
    });

    it('applyLazyLoadEvent() contains', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'Name': { 'value': 'abc', 'matchMode': 'contains' }
            }
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Filter');
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Filter).toHaveBeenCalledWith('contains(Name, \'abc\')');
    });

    it('applyLazyLoadEvent() concat', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'Name': { 'value': 'abcd', 'matchMode': 'concat:d:eq' }
            }
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Filter');
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Filter).toHaveBeenCalledWith('concat(Name, \'d\') eq \'abcd\'');
    });

    it('applyLazyLoadEvent() substring 1', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'Name': { 'value': 'abc', 'matchMode': 'substring:1:eq' }
            }
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Filter');
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Filter).toHaveBeenCalledWith(`substring(Name, 1) eq 'abc'`);
    });

    it('applyLazyLoadEvent() substring 2', () => {
        // Assign
        const loadEvent: LazyLoadEvent = {
            filters: {
                'Name': { 'value': 'abc', 'matchMode': 'substring:1:2:eq' }
            }
        };

        // Act
        const query = new ODataQuery<Employee>('Employees', config, undefined);

        spyOn(query, 'Filter');
        PrimeNGDataTableODataQueryExtensions.applyLazyLoadEvent(query, loadEvent);

        // Assert
        expect(query.Filter).toHaveBeenCalledWith(`substring(Name, 1, 2) eq 'abc'`);
    });
});