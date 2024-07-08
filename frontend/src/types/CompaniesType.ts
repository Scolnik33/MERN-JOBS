import { AuthType } from "./AuthType"
import { JobsType } from "./JobsType"

export type CompamiesType = {
    _id: string,
    name: string,
    description: string,
    image: string,
    vacancies: JobsType[],
    representatives: AuthType[],
    rating: number,
    voters: AuthType[],
} & {
    0: CompamiesType
}