import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  /* array to store employees */
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  /* function to fetch employees */
  fetchEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }
/* router funtion to navigate to edit employee page */
  editEmployee(id: number): void {
    this.router.navigate(['/employee/edit', id]);
  }

  /* function to delete an employee */
  deleteEmployee(id: number, name: string): void {
    const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
    if (confirmDelete) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.openSnackBar(`The Employee ${name} is deleted successfully.`);
      this.fetchEmployees(); // Refresh employee list after deletion
    });
    }
  }

  /* function to open a snackbar message */
  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
