import { AuthType } from "./AuthType"

export type JobsType = {
    _id: string,
    vacancy: string,
    description: string,
    salary: number,
    location: string,
    employment: string,
    experience: string,
    category: string,
    image: string,
    quantityViews: number,
    user: AuthType,
    createdAt: string,
    updatedAt: string,
}