import * as React from "react"


interface TextBoxProps {
    value: string;
}


function TextBox(props: TextBoxProps) {
    const {
        value
    } = props;

    return <input
        type="text"
        value={value}
    />
}


export default TextBox;