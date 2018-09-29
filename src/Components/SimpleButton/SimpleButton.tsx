import * as React from "react";

import Button from "Primitives/Button";
import { addClassName } from "../../Utils";
import * as Styles from "./SimpleButton.scss";

class Props {
    title: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    style?: "Default" | "Primary" | "Danger" | "Warning";
}

function SimpleButton(props: Props): JSX.Element {
    const { title, onClick, disabled = false, style = "Default" } = props;

    const className =
        Styles.Button +
        addClassName(!!Styles[style], Styles[style]) +
        addClassName(disabled, Styles.Disabled);

    return (
        <Button className={className} onClick={event => onClick(event)}>
            {title}
        </Button>
    );
}

export default SimpleButton;
