import * as classnames from "classnames";
import * as React from "react";

import * as Styles from "./OptionSelect.scss";

interface IOption<TValue> {
    title: string;
    value: TValue;
}

interface IProps<TValue> {
    value: TValue | TValue[];
    options: Array<IOption<TValue>>;
    onChange: (value: TValue) => void;
    isMultiple?: boolean;
    className?: string;
}

interface IState {
    isOpened: boolean;
}

class OptionSelect<TValue> extends React.Component<IProps<TValue>, IState> {
    constructor(props: IProps<TValue>) {
        super(props);

        this.state = {
            isOpened: false
        };
    }

    public render() {
        const { value, options } = this.props;

        const selected = options.find(option => option.value === value);

        const className = classnames(
            Styles.OptionSelect,
            this.props.className,
            {
                [Styles.IsOpened]: this.state.isOpened
            }
        );

        return (
            <div className={className}>
                <div onClick={this.toggle}>
                    {selected ? selected.title : "Выберите элемент..."}
                </div>
                <ul>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => this.select(option.value)}
                        >
                            {option.title}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    private toggle = () => {
        this.setState(prevState => ({ isOpened: !prevState.isOpened }));
    };

    private select = (value: TValue) => {
        this.props.onChange(value);
        this.toggle();
    };
}

export default OptionSelect;
