import * as React from "react";
import { 
    CheckButton,
    Layout, 
    NumberInput, 
    RadioButton,
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


class Inputs extends React.Component<{}, any> {
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


class CheckButtons extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value: false,
        };
    }

    render() {
        const { value } = this.state;

        return <section>
            <header>Check button</header>
            <div>
                <CheckButton
                    value={value}
                    onChange={newValue => this.setState({ value: newValue })}
                />
            </div>
        </section>;
    }
}


class RadioButtonGroup extends React.Component<{}, any> {
    constructor(props: {}) {
        super(props);

        this.state = {
            value: 1,
        };
    }

    render() {
        const { value } = this.state;

        return <section>
            <header>Radio button group</header>
            <div>
                <RadioButton value={1} checked={value === 1} onSelect={value => this.setState({ value })} />
                <RadioButton value={2} checked={value === 2} onSelect={value => this.setState({ value })} />
                <RadioButton value={3} checked={value === 3} onSelect={value => this.setState({ value })} />
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
            <RadioButtonGroup />
        </Layout>
    </div>;
}


export default Examples;