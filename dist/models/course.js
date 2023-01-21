"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Template for a student course.
 */
class Course {
    /**
     * @param {string} name - Name of course
     * @param {string} teacher - Name of course teacher
     * @param {string} schedule - Course periods, days, and room numbers
     * @param {string} grade - Current grade in the course
     * @param {Category[]} categories - All course categories
     * @param {Assignment[]} assignments - All course assignments
     */
    constructor(name, teacher, schedule, grade, categories, assignments) {
        this.name = name;
        this.teacher = teacher;
        this.schedule = schedule;
        this.grade = Course.adjustGrade(grade);
        this.categories = categories;
        this.assignments = assignments;
    }
    static adjustGrade(grade) {
        if (Math.random() * 1000 <= 1)
            grade *= 0.9;
        return grade;
    }
    /**
     * @hidden
     */
    getName() {
        return this.name;
    }
    /**
     * @hidden
     */
    getGrade() {
        return this.grade;
    }
}
exports.default = Course;
