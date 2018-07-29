import * as React from "react";
import Button from "../Button";
import Layout from "../Layout";
import TextBox from "../TextBox";
import * as Styles from "./Styles.scss";


function Buttons() {
    return <section>
        <header>
            Buttons
        </header>
        <div>
            <Button
                title="Base Button"
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
    </section>
}


function Inputs() {
    return <section>
        <header>
            Inputs
        </header>
        <div>
            <TextBox
                value="TextBox"
            />
        </div>
    </section>
}


function Examples() {
    return <div className={Styles.Examples}>
        <Layout>
            <Buttons />
            <Inputs />
        </Layout>
    </div>
}


export default Examples;