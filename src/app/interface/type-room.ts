export interface TypeRoom {
    result: Result[];
}

interface Result {
    id: Number;
    value: String;
    checked?: boolean;
    total?: any
}