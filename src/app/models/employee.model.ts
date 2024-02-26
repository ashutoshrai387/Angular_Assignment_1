export interface Employee {
    id: number;
    name: string;
    contactNumber: string;
    email: string;
    gender: string;
    skills: Skill[];
  }
  
  export interface Skill {
    name: string;
    experience: string;
  }
  