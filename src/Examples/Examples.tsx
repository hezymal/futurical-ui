import * as React from "react";
import { 
    CheckButton,
    Layout, 
    NumberInput, 
    SimpleButton, 
    TextInput,
} from "../library-index";
import * as Styles from "./Styles.scss";


function SimpleButtons() {
    return <section>
        <header>Buttons</header>
        <div>
            <SimpleButton
                title="Default Button"
                onClick={() => {}}
            />
        </div>
        <div>
            <SimpleButton
                title="Primary Button"
                style="Primary"
                onClick={() => {}}
            />
        </div>
        <div>
            <SimpleButton
                title="Danger Button"
                style="Danger"
                onClick={() => {}}
            />
        </div>
        <div>
            <SimpleButton
                title="Warning Button"
                style="Warning"
                onClick={() => {}}
            />
        </div>
    </section>;
}


interface InputsState {
    integerInputValue: number;
    floatInputValue: number;
    textInputValue: string;
}


class Inputs extends React.Component<{}, InputsState> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            integerInputValue: 1234,
            floatInputValue: 12.34,
            textInputValue: "Text Input",
        };
    }

    render(): JSX.Element {
        const { 
            textInputValue,
            integerInputValue,
            floatInputValue,
        } = this.state;

        return <section>
            <header>Inputs</header>
            <div>
                <TextInput
                    value={textInputValue}
                    onChange={value => this.setState({ textInputValue: value })}
                />
            </div>
            <div>
                <NumberInput
                    value={integerInputValue}
                    onChange={value => this.setState({ integerInputValue: value })}
                /> 
            </div> 
            <div>
                <NumberInput
                    value={floatInputValue}
                    isFloat={true}
                    onChange={value => this.setState({ floatInputValue: value })}
                /> 
            </div> 
        </section>;
    }
}


interface CheckButtonsState {
    value1: boolean;
}


class CheckButtons extends React.Component<{}, CheckButtonsState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value1: false,
        };
    }

    render() {
        const { value1 } = this.state;

        return <section>
            <header>Check Buttons</header>
            <div>
                <CheckButton
                    value={value1}
                    onChange={newValue => this.setState({ value1: newValue })}
                />
            </div>
        </section>;
    }
}


function Examples() {
    return <div className={Styles.Examples}>
        <Layout>
            <SimpleButtons />
            <Inputs />
            <CheckButtons />
        </Layout>
    </div>;
}


export default Examples;