export class Student {
    name: string
    gpa: number
    courses: Course[]

    constructor(name: string, courses: Course[]) {
        this.name = name
        this.courses = courses
        
        let total = 0
        this.courses.forEach(course => {
            total += course.grade
        })
        
        this.gpa = total / this.courses.length
    }
}

export class Course {
    name: string
    teacher: string
    grade: number
    categories: Category[]
    assignments: Assignment[]

    constructor(name: string, grade: number, teacher: string, categories: Category[], assignments: Assignment[]) {
        this.name = name
        this.grade = grade
        this.teacher = teacher
        this.categories = categories
        this.assignments = assignments
    }
}

export class Category {
    name: string
    grade: number
    weight: number
    
    constructor(name: string, grade: number, weight: number) {
        this.name = name
        this.grade = grade
        this.weight = weight

    }
}

export class Assignment {
    name: string
    category: string
    due: string
    graded: boolean
    score: number | null
    points: number

    constructor(name: string, category: string, due: string, graded: boolean, score: number | null, points: number) {
        this.name = name
        this.category = category
        this.due = due
        this.graded = graded
        this.score = score
        this.points = points
    }
}