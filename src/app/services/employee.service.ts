import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    const employee = this.employees.find(e => e.employeeId === id);
    return of(employee);
  }

  addEmployee(employee: Employee): Observable<void> {
    // Generate unique id for new employee
    const id = this.employees.length > 0 ? this.employees[this.employees.length - 1].employeeId + 1 : 1;
    employee.employeeId = id;
    this.employees.push(employee);
    return of(undefined);
  }

  updateEmployee(id: number, employeeData: Employee): Observable<void> {
    const index = this.employees.findIndex(e => e.employeeId === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...employeeData };
    }
    return of(undefined);
  }

  deleteEmployee(id: number): Observable<void> {
    const index = this.employees.findIndex(e => e.employeeId === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
    return of(undefined);
  }
}