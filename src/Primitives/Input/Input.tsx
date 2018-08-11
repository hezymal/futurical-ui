import * as React from "react";


interface InputProps {
    value: string;
    pattern?: RegExp;
    className: string;
    onChange: (value: string) => void;
}


function Input(props: InputProps): JSX.Element {
    const {
        value,
        pattern,
        className,
        onChange,
    } = props;

    return <input
        type="text"
        value={value}
        className={className}
        onChange={event => {
            const value = event.target.value;
            if (pattern) {
                if (pattern.test(value)) {
                    onChange(value);
                }
            } else {
                onChange(value);
            }
        }}
    />
}


export default Input;