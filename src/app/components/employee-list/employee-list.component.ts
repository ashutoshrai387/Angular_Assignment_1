import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employee/edit', id]);
  }

  deleteEmployee(id: number, name: string): void {
    const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.fetchEmployees(); // Refresh employee list after deletion
        this.openSnackBar(`The Employee ${name} is deleted successfully.`);
      });
    }
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
