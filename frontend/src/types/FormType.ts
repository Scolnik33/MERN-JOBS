export type FormCreateValues = {
  vacancy: string;
  description: string;
  salary: number;
  location: string;
  employment: string;
  experience: string;
  category: string;
  image: string;
};

export type FormRegisterValues = {
  email: string;
  name: string;
  password: string;
  about: string;
  companyName: string;
  companyDescription: string;
  companyImage: string;
  speciality: string;
  role: string;
  avatar: string;
}

export type FormLoginValues = {
  email: string;
  password: string;
};