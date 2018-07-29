import * as React from "react";
import { Button, Layout, TextInput } from "../library-index";
import * as Styles from "./Styles.scss";


function Buttons() {
    return <section>
        <header>
            Buttons
        </header>
        <div>
            <Button
                title="Default Button"
                onClick={() => {}}
            />
        </div>
        <div>
            <Button
                title="Primary Button"
                style="Primary"
                onClick={() => {}}
            />
        </div>
        <div>
            <Button
                title="Danger Button"
                style="Danger"
                onClick={() => {}}
            />
        </div>
        <div>
            <Button
                title="Warning Button"
                style="Warning"
                onClick={() => {}}
            />
        </div>
    </section>;
}


interface InputsState {
    textInputValue: string;
}


class Inputs extends React.Component<{}, InputsState> {
    constructor(props: {}) {
        super(props);
        
        this.state = {
            textInputValue: "Text Input",
        };
    }

    changeTextInput = (value: string) => {
        this.setState({
            textInputValue: value,
        });
    }

    render(): JSX.Element {
        const { 
            textInputValue 
        } = this.state;

        return <section>
            <header>
                Inputs
            </header>
            <div>
                <TextInput
                    onChange={value => this.changeTextInput(value)}
                    value={textInputValue}
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