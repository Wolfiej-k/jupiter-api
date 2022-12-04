"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = exports.Category = exports.Course = exports.Student = void 0;
class Student {
    constructor(name, courses) {
        this.name = name;
        this.courses = courses;
        let total = 0;
        this.courses.forEach(course => {
            total += course.grade;
        });
        this.gpa = total / this.courses.length;
    }
}
exports.Student = Student;
class Course {
    constructor(name, grade, teacher, categories, assignments) {
        this.name = name;
        this.grade = grade;
        this.teacher = teacher;
        this.categories = categories;
        this.assignments = assignments;
    }
}
exports.Course = Course;
class Category {
    constructor(name, grade, weight) {
        this.name = name;
        this.grade = grade;
        this.weight = weight;
    }
}
exports.Category = Category;
class Assignment {
    constructor(name, category, due, graded, score, points) {
        this.name = name;
        this.category = category;
        this.due = due;
        this.graded = graded;
        this.score = score;
        this.points = points;
    }
}
exports.Assignment = Assignment;
