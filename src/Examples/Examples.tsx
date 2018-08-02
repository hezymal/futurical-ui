import * as React from "react";
import { 
    SimpleButton, 
    Layout, 
    NumberInput, 
    TextInput,
} from "../library-index";
import * as Styles from "./Styles.scss";


function Buttons() {
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


function Examples() {
    return <div className={Styles.Examples}>
        <Layout>
            <Buttons />
            <Inputs />
        </Layout>
    </div>;
}


export default Examples;