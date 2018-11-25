import * as React from "react";
import * as classnames from "classnames";
import Input from "Primitives/Input";
import * as Styles from "./TimeInput.scss";

interface Props {
    value: string;
    secondComponent?: boolean;
    className?: string;
    onChange: (value: string) => void;
}

function TimeInput(props: Props) {
    const { value, secondComponent = false, className, onChange } = props;

    const fullClassName = classnames(Styles.TimeInput, className);
    const pattern = secondComponent
        ? /^([0-1]{1}[0-9]{1}|2[0-3]{1})\:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$/
        : /^([0-1]{1}[0-9]{1}|2[0-3]{1})\:[0-5]{1}[0-9]{1}$/;

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

export default TimeInput;
