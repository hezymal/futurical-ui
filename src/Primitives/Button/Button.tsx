import * as React from "react";


class Props {
    children?: null | string | JSX.Element | JSX.Element[];
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


function Button(props: Props): JSX.Element {
    const {
        children,
        className,
        onClick,
    } = props;

    return <button 
        className={className}
        onClick={event => onClick(event)}
    >
        {children}
    </button>
}


export default Button;
