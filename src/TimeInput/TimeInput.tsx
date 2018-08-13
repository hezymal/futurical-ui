import * as React from "react";
import Input from "../Primitives/Input";
import * as Styles from "./TimeInput.scss";
import { addClassName } from "../Utils";


interface Props {
    value: string;
    className?: string;
    onChange: (value: string) => void;
}


function TimeInput(props: Props) {
    const {
        value,
        className,
        onChange,
    } = props;

    const fullClassName = Styles.TimeInput
        + addClassName(!!className, className);

    return <Input
        value={value}
        pattern={/^([0-1]{1}[0-9]{1}|2[0-3]{1})\:[0-5]{1}[0-9]{1}$/}
        className={fullClassName}
        insert={true}
        onChange={newValue => onChange(newValue)}
    />
}


export default TimeInput;