import { CompamiesType } from "./CompaniesType";
import { JobsType } from "./JobsType";

export type AuthType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  about: string;
  role: string;
  company: CompamiesType;
  speciality: string;
  jobs: JobsType[];
  favorities: JobsType[];
  avatar: string;
  createdAt: string;
  updatedAt: string;
} 
