import * as React from "react";
import * as Styles from "./TextInput.scss";
import Input from "../Primitives/Input";


interface TextBoxProps {
    value: string;
    pattern?: RegExp;
    onChange: (value: string) => void;
}


function TextBox(props: TextBoxProps) {
    const {
        value,
        pattern,
        onChange,
    } = props;

    return <Input
        value={value}
        className={Styles.TextInput}
        pattern={pattern}
        onChange={value => onChange(value)}
    />;
}


export default TextBox;