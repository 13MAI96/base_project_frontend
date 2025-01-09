import { Technologies, Technology } from "./technologies"

export class Experience{
    title!: string
    constructor(title: string){
        this.title = title
    }
}

export class WorkExperience extends Experience{
    company: string
    start_date: Date
    end_date: Date | null
    technologies: Technology[]
    tasks: string[]

    constructor(title: string, company: string, start_date: Date, end_date: Date | null, technologies: Technology[], tasks: string[]){
        super(title)
        this.company = company
        this.start_date = start_date
        this.end_date = end_date
        this.technologies = technologies
        this.tasks = tasks
    }
}

export class ProjectExperience extends Experience{
    start_date!: Date
    end_date!: Date | null
    tecnologies!: string[]
    funcionalities!: string[]
}

export const experience: WorkExperience[] = [
    new WorkExperience('role', 'Tec Solutions', new Date('03-01-2023'), new Date('03-01-2024'), [
        Technologies['JAVASCRIPT'],
        Technologies['ANGULAR'],
        Technologies['PHP'],
        Technologies['APACHE'],
        Technologies['MONDAY'],
        Technologies['NODE'],
        Technologies['PYTHON'],
        Technologies['POSTMAN'],
        Technologies['DOCKER'],
        Technologies['TYPESCRIPT']
    ], []),
    new WorkExperience('icbc_role', 'ICBC Argentina', new Date('10-01-2021'), new Date('02-28-2023'), [], []),
    new WorkExperience('moby_role', 'Moby Digital', new Date('08-02-2022'), new Date('02-28-2023'), [], []),

]