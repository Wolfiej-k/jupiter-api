"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Template for a course category.
 */
class Category {
    /**
     * @param {string} name - Name of category
     * @param {number | null} grade - Average assignment grade in category
     * @param {number} weight - Weight of category in grade average
     */
    constructor(name, grade, weight) {
        this.name = name;
        this.grade = grade;
        this.weight = weight;
    }
}
exports.default = Category;
