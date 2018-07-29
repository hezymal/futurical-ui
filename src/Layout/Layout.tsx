import * as React from "react"
import * as Styles from "./Styles.scss"


function Layout(props: { children: JSX.Element | JSX.Element[] }) {
    const {
        children
    } = props

    return <div className={Styles.Layout}>
        {children}
    </div>
}


export default Layout;