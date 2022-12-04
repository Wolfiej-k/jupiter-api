class Assignment {
    due: string
    name: string
    score: number | null
    points: number
    category: string
    graded: boolean

    constructor(due: string, name: string, score: number | null, points: number, category: string) {
        this.due = due
        this.name = name
        this.score = score
        this.points = points
        this.category = category
        this.graded = !Number.isNaN(this.score)
    }
}

export default Assignment