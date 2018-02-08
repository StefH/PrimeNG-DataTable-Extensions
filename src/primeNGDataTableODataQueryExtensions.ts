import { StringUtils } from 'string-split-join';

import { ODataQuery } from 'angular-odata-es5';
import { FilterMetadata, LazyLoadEvent, SortMeta } from 'primeng/primeng';

export class PrimeNGDataTableODataQueryExtensions {
    private static separatorChar: ':';
    private static escapeChar: '\\';

    public static applyLazyLoadEvent<T>(query: ODataQuery<T>, event: LazyLoadEvent): ODataQuery<T> {
        if (event.rows > 0) {
            query = query.Top(event.rows);
        }

        if (event.first > 0) {
            query = query.Skip(event.first);
        }

        if (event.filters) {
            const filterOData: string[] = [];

            for (const filterProperty in event.filters) {
                if (event.filters.hasOwnProperty(filterProperty)) {
                    const filter = event.filters[filterProperty] as FilterMetadata;

                    if (filter.matchMode && filter.matchMode !== '') {
                        const params = StringUtils.split(filter.matchMode.toLowerCase(), {
                            separatorChar: PrimeNGDataTableODataQueryExtensions.separatorChar,
                            escapeChar: PrimeNGDataTableODataQueryExtensions.escapeChar
                        });
                        const operator = params[0];

                        // Replace Boss.Name by Boss/Name
                        const odataProperty: string = filterProperty.replace(/\./g, '/');

                        // http://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part2-url-conventions.html
                        switch (operator) {
                            case 'day':
                            case 'fractionalseconds':
                            case 'hour':
                            case 'minute':
                            case 'month':
                            case 'second':
                            case 'totaloffsetminutes':
                            case 'totalseconds':
                            case 'year':
                                filterOData.push(`${operator}(${odataProperty}) ${params[1]} ${filter.value}`);
                                break;

                            // Logical Operators
                            case 'eq':
                            case 'ne':
                            case 'gt':
                            case 'ge':
                            case 'lt':
                            case 'le':
                                filterOData.push(`${odataProperty} ${operator} ${filter.value}`);
                                break;
                            case 'has':
                                throw new Error('Logical Operator "has" is not supported yet!');

                            // String Functions
                            case 'concat':
                                filterOData.push(`${operator}(${odataProperty}, '${params[1]}') ${params[2]} '${filter.value}'`);
                                break;

                            case 'contains':
                            case 'endswith':
                            case 'startswith':
                                filterOData.push(`${operator}(${odataProperty}, '${filter.value}')`);
                                break;
                            case 'length':
                                filterOData.push(`${operator}(${odataProperty}) ${params[1]} ${filter.value}`);
                                break;
                            case 'substring':
                                // Example: substring:1:eq
                                if (params.length === 3) {
                                    filterOData.push(`${operator}(${odataProperty}, ${params[1]}) ${params[2]} '${filter.value}'`);
                                }

                                // Example: substring:1:2:eq
                                if (params.length === 4) {
                                    filterOData.push(`${operator}(${odataProperty}, ${params[1]}, ${params[2]}) ${params[3]} '${filter.value}'`);
                                }
                                break;

                            default:
                            // no filterOData
                        }
                    }
                }
            }

            if (filterOData.length > 0) {
                query = query.Filter(filterOData.join(' and '));
            }
        }

        let orderings: string[] = [];
        const getOrderAsText = (order?: number) => {
            return order && order > 0 ? 'asc' : 'desc';
        };

        if (event.sortField) {
            orderings.push(event.sortField + ' ' + getOrderAsText(event.sortOrder));
        }

        if (event.multiSortMeta) {
            orderings = event.multiSortMeta.map((e: SortMeta) => e.field + ' ' + getOrderAsText(e.order));
        }

        if (orderings.length > 0) {
            query = query.OrderBy(orderings.join(', '));
        }

        return query;
    }
}
