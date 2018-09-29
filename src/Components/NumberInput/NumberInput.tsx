import * as React from "react";

import Input from "Primitives/Input";
import * as Styles from "./NumberInput.scss";

interface Props {
    value: number;
    isFloat?: boolean;
    onChange: (value: number) => void;
}

interface State {
    displayValue: string;
}

class NumberInput extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            displayValue: props.value.toString()
        };
    }

    render(): JSX.Element {
        const { onChange, isFloat } = this.props;

        const { displayValue } = this.state;

        const pattern = isFloat ? /^[0-9]*\.{0,1}[0-9]*$/ : /^[0-9]*$/;

        return (
            <Input
                value={displayValue}
                className={Styles.NumberInput}
                pattern={pattern}
                onChange={value => {
                    this.setState({ displayValue: value });
                    onChange(isFloat ? parseFloat(value) : parseInt(value));
                }}
            />
        );
    }
}

export default NumberInput;
