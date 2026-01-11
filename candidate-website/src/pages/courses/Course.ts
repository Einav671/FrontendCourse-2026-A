export class Course {
    id: string;          // מזהה פנימי (לשימוש ב-React key)
    name: string;        // שם הקורס
    code: string;        // קוד הקורס
    credits: number;     // נק"ז
    description: string; // תיאור
    degreeCode: string;  // שייך לתואר (קוד תואר)
    type: string;        // סוג (חובה/בחירה)

    constructor(
        id: string, 
        name: string, 
        code: string, 
        credits: number, 
        description: string, 
        degreeCode: string, 
        type: string
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.credits = credits;
        this.description = description;
        this.degreeCode = degreeCode;
        this.type = type;
    }
}