export interface Status {
    result: Result[];
}

interface Result {
    id: Number;
    value: String;
    name?: String;
    checked?: boolean;
}