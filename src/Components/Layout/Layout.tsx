import * as classnames from "classnames";
import * as React from "react";

import * as Styles from "./Styles.scss";

interface IProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
}

function Layout(props: IProps) {
    const { children } = props;

    const className = classnames(Styles.Layout, props.className);

    return <div className={className}>{children}</div>;
}

export default Layout;
