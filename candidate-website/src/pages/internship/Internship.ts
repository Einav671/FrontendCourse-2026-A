export interface Internship {
    id: string;
    title: string;
    description: string;
    careerPaths: string[]; // מערך של מחרוזות
    skills: string[];      // מערך של מחרוזות
    icon: string;
    color?: string;        // אופציונלי - לצבע הרקע
}