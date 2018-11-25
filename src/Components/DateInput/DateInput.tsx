import * as React from "react";
import * as classnames from "classnames";
import Input from "Primitives/Input";
import * as Styles from "./DateInput.scss";

interface Props {
    value: string;
    className?: string;
    onChange: (newValue: string) => void;
}

function DateInput(props: Props) {
    const { value, className, onChange } = props;
    const fullClassName = classnames(Styles.DateInput, className);
    const pattern = /^([0-2]{1}[0-9]{1}|3[0-1]{1})\.(0[0-9]{1}|1[0-2]{1})\.[0-9]{4}$/;

    return (
        <Input
            value={value}
            pattern={pattern}
            className={fullClassName}
            insert={true}
            onChange={newValue => onChange(newValue)}
        />
    );
}

export default DateInput;
