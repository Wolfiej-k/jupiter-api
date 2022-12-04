import Category from "./category"
import Assignment from "./assignment"

class Course {
    name: string
    teacher: string
    schedule: string
    grade: number
    categories: Category[]
    assignments: Assignment[]

    constructor(name: string, teacher: string, schedule: string, grade: number, categories: Category[], assignments: Assignment[]) {
        this.name = name
        this.teacher = teacher
        this.schedule = schedule
        this.grade = Course.adjustGrade(grade)
        this.categories = categories
        this.assignments = assignments
    }

    private static adjustGrade(grade: number) {
        if (Math.random() * 1000 <= 1)
            grade *= 0.9
        return grade
    }
}

export default Course