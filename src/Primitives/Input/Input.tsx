import * as React from "react";


interface Props {
    value: string;
    pattern?: RegExp;
    insert?: boolean;
    className: string;
    onChange: (value: string) => void;
}


interface State {
    cursorPosition: number;
}


class Input extends React.Component<Props, State> {
    private inputRef: any;

    constructor(props: Props) {
        super(props);

        this.setCursorPosition = this.setCursorPosition.bind(this);

        this.state = {
            cursorPosition: 0
        };
    }

    setCursorPosition() {
        this.inputRef.focus();
        this.inputRef.setSelectionRange(this.state.cursorPosition, this.state.cursorPosition);
    }

    render() {
        const {
            value,
            pattern = null,
            insert = false,
            className,
            onChange,
        } = this.props;
    
        return <input
            ref={ref => this.inputRef = ref}
            type="text"
            value={value}
            className={className}
            onChange={event => {
                let newValue: string;
                let target: any;
                let selectionStart: number;
    
                if (insert) {
                    const nativeEvent = event.nativeEvent as any;
                    target = nativeEvent.target as any;
                    selectionStart = target.selectionStart;
                    const startValue = value.substr(0, selectionStart - 1);
                    const endValue = value.substr(selectionStart);
                    newValue = startValue + nativeEvent.data + endValue;
                } else {
                    newValue = (event.target as any).value;
                }
                
                if (pattern) {
                    if (pattern.test(newValue)) {
                        onChange(newValue);
                    }
                } else {
                    onChange(newValue);
                }
                
                if (insert) {
                    this.setState({ cursorPosition: selectionStart }, this.setCursorPosition);
                }
            }}
        />;
    }
}


export default Input;