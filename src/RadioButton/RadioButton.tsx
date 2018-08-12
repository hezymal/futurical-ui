import * as React from "react";
import Button from "../Primitives/Button";
import { addClassName } from "../Utils";
import * as Styles from "./RadioButton.scss";


interface Props {
    value: any;
    checked: boolean;
    onSelect: (value: any) => void;
    className?: string;
}


function RadioButton(props: Props) {
    const {
        value,
        checked,
        className = "",
        onSelect,
    } = props;

    const fullClassName = Styles.RadioButton
        + addClassName(!!className, className)
        + addClassName(checked, Styles.Checked);

    return <Button
        className={fullClassName}
        onClick={() => onSelect && onSelect(value)}
    />;
}


export default RadioButton;