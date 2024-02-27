import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  /* array to store employees */
  private employees: Employee[] = [];

  constructor() { }

  /* function to get all employees */
  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  /* function to get an employee by id */
  getEmployeeById(id: number): Observable<Employee | undefined> {
    const employee = this.employees.find(e => e.employeeId === id);
    return of(employee);
  }

  /* function to check for duplicate employee id */
  isDuplicateId(id: number): boolean {
    return this.employees.some(employee => employee.employeeId === id);
  }

  /* function to add employee */
  addEmployee(employee: Employee): Observable<void> {
    if (this.isDuplicateId(employee.employeeId)) {
      return new Observable(observer => {
        observer.error('Employee ID already exists. Please enter a different ID.');
        alert('Employee ID already exists. Please enter a different ID.');
      });
    }
    this.employees.push(employee);
    return of(undefined);
  }

  /* function to update an existing employee */
  updateEmployee(id: number, employeeData: Employee): Observable<void> {
    const index = this.employees.findIndex(e => e.employeeId === id);
    if (index !== -1) {
      this.employees[index] = employeeData;
    }   
    return of(undefined);
  }

  /* function to delete an employee */
  deleteEmployee(id: number): Observable<void> {
    const index = this.employees.findIndex(e => e.employeeId === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
    return of(undefined);
  }
}