import * as React from "react";
import * as classnames from "classnames";

import Button from "Primitives/Button";
import * as Styles from "./CheckButton.scss";

interface Props {
    value: boolean;
    className?: string;
    onChange: (newValue: boolean) => void;
}

function CheckButton(props: Props) {
    const { value, className, onChange } = props;

    const fullClassName = classnames(Styles.CheckButton, className, {
        [Styles.Checked]: value,
    });

    return (
        <Button className={fullClassName} onClick={() => onChange(!value)} />
    );
}

export default CheckButton;
