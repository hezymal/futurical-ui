import * as React from "react";
import Button from "../Primitives/Button";
import * as Styles from "./CheckButton.scss";
import { addClassName } from "../Utils";


interface Props {
    value: boolean;
    className?: string;
    onChange: (newValue: boolean) => void;
}


function CheckButton(props: Props) {
    const {
        value,
        className,
        onChange,
    } = props;

    const fullClassName = Styles.CheckButton
        + addClassName(!!className, className)
        + addClassName(value, Styles.Checked);

    return <Button 
        className={fullClassName}
        onClick={() => onChange(!value)}
    />;
}


export default CheckButton;