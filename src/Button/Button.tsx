import * as React from "react";
import { addClassName } from "../Utils"
import * as Styles from "./Button.scss";


class Props {
    title: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    style?: "Default" | "Primary" | "Danger" | "Warning";
}


function Button(props: Props): JSX.Element {
    const {
        title,
        onClick,
        disabled = false,
        style = "Default",
    } = props;

    const className = Styles.Button 
        + addClassName(!!Styles[style], Styles[style])
        + addClassName(disabled, Styles.Disabled);

    return <button 
        className={className}
        onClick={event => onClick(event)}
    >
        {title}
    </button>
}


export default Button;
