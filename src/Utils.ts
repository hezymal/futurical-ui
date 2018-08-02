export function addClassName(condition: boolean, classNameIfTrue: string, classNameIfFalse: string = "") {
    return " " + (condition ? classNameIfTrue : classNameIfFalse);
}