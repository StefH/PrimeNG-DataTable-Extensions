import { Order } from './order';

export interface Employee {
    EmployeeID: number;
    FirstName: string;
    LastName: string;
    City: string;
    BirthDate: Date;
    Orders: Order[];
}
