export interface Employee {
    employeeId: number;
    name: string;
    email: string;
    contactNumber: string;
    gender: string;
    skills: Skill[];
  }
  
  export interface Skill {
    name: string;
    experience: string;
  }
  