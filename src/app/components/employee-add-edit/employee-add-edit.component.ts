import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  employeeForm!: FormGroup ;
  isEditMode: boolean = false;
  employeeId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
          this.initForm(employee);
        });
      } else {
        this.initForm(undefined);
      }
    });
  }

  initForm(employee: Employee | undefined): void {
    this.employeeForm = this.formBuilder.group({
      employeeId: [employee ? employee.employeeId : '', Validators.required],
      name: [employee ? employee.name : '', Validators.required],
      contactNumber: [employee ? employee.contactNumber : '', Validators.required],
      email: [employee ? employee.email : '', [Validators.required, Validators.email]],
      gender: [employee ? employee.gender : 'Male', Validators.required],
      skills: this.formBuilder.array([])
    });

    if (employee && employee.skills) {
      employee.skills.forEach(skill => {
        this.addSkill(skill.name, skill.experience);
      });
    } else {
      this.addSkill();
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }
    const employeeData: Employee = this.employeeForm.value;
    if (this.isEditMode && this.employeeId !== null) {
      this.employeeService.updateEmployee(this.employeeId, employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  addSkill(skillName: string = '', experience: string = ''): void {
    this.skills.push(this.formBuilder.group({
      name: [skillName, Validators.required],
      experience: [experience]
    }));
  }

  deleteSkill(index: number): void {
    this.skills.removeAt(index);
    if (this.skills.length === 1) {
      const skillControl = this.skills.controls[0].get('name');
      if (skillControl) {
        skillControl.enable();
      }
    }
  }
}
