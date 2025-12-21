export class Scholarship {
    id: string;
    code: string;
    name: string;
    targetAudience: string;
    amount: number;
    link: string;
    conditions: string;

    constructor(
        id: string,
        code: string,
        name: string,
        targetAudience: string,
        amount: number,
        link: string,
        conditions: string
    ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.targetAudience = targetAudience;
        this.amount = amount;
        this.link = link;
        this.conditions = conditions;
    }
}