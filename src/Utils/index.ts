//import * as Styles from "./Styles.scss";

export function addClassName(condition: boolean, classNameIfTrue: string, classNameIfFalse: string = "") {
    return " " + (condition ? classNameIfTrue : classNameIfFalse);
}