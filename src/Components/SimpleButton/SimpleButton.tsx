import * as React from "react";
import * as classnames from "classnames";
import Button from "Primitives/Button";
import * as Styles from "./SimpleButton.scss";

class Props {
    title: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    style?: "Default" | "Primary" | "Danger" | "Warning";
}

function SimpleButton(props: Props): JSX.Element {
    const { title, onClick, disabled = false, style = "Default" } = props;

    const className = classnames(Styles.Button, Styles[style], {
        [Styles.Disabled]: disabled
    });

    return (
        <Button className={className} onClick={event => onClick(event)}>
            {title}
        </Button>
    );
}

export default SimpleButton;
