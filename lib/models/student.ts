import Course from "./course"

class Student {
    name: string
    gpa: number
    courses: Course[]

    constructor(name: string, courses: Course[]) {
        this.name = name
        this.courses = courses
        
        let total = 0
        let sub = 0
        this.courses.forEach(course => {
            if (course.name != 'Phys Ed')
                total += Math.round(course.grade)
            else sub++
        })
        
        this.gpa = total / (this.courses.length - sub)
    }
}

export default Student