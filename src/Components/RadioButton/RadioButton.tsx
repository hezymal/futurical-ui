import * as React from "react";
import * as classnames from "classnames";
import Button from "Primitives/Button";
import * as Styles from "./RadioButton.scss";

interface Props {
    value: any;
    checked: boolean;
    onSelect: (value: any) => void;
    className?: string;
}

function RadioButton(props: Props) {
    const { value, checked, className = "", onSelect } = props;

    const fullClassName = classnames(Styles.RadioButton, className, { 
        [Styles.Checked]: checked 
    });

    return (
        <Button
            className={fullClassName}
            onClick={() => onSelect && onSelect(value)}
        />
    );
}

export default RadioButton;
