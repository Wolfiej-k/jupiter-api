"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Template for a course assignment.
 */
class Assignment {
    /**
     * @param {string} due - Due date of assignment
     * @param {string} name - Name of assignment
     * @param {number | null} score - Points earned if complete
     * @param {number} points - Total number of points possible
     * @param {string} category - Category of assignment
     */
    constructor(due, name, score, points, category) {
        this.due = due;
        this.name = name;
        this.score = score;
        this.points = points;
        this.category = category;
        this.graded = !Number.isNaN(score);
    }
}
exports.default = Assignment;
