import * as React from "react"
import * as Styles from "./TextInput.scss"


interface TextBoxProps {
    value: string;
    onChange: (value: string) => void;
}


function TextBox(props: TextBoxProps) {
    const {
        value,
        onChange,
    } = props;

    return <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        className={Styles.TextInput}
    />
}


export default TextBox;