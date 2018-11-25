import * as React from "react";
import IColumn from "../IColumn";
import * as _Styles from "./BodyComponent.scss";

const rowHeight = 36;

class BodyComponent<TItem> extends React.Component<BodyComponent.IProps<TItem>, BodyComponent.IState> {
    public constructor(props: BodyComponent.IProps<TItem>) {
        super(props);

        this.onScroll = this.onScroll.bind(this);

        this.state = {
            scrollTop: 0,
        };
    }

    public render() {
        const {
            columns,
            data,
            tableHeight,
        } = this.props;

        const {
            scrollTop,
        } = this.state;

        const body: JSX.Element[] = [];

        // calculate indexes and sizes
        const height = tableHeight;
        const topCount = Math.floor(scrollTop / rowHeight);
        const midCount = Math.ceil((scrollTop + height) / rowHeight) - topCount;
        const botCount = data.length - topCount - midCount;

        const topSpaceHeight = topCount * rowHeight;
        const botSpaceHeight = botCount * rowHeight;

        // top space
        if (topSpaceHeight) {
            body.push(<tr key="top-space" style={{ height: topSpaceHeight + "px" }} />);
        }

        // mid content
        const cellStyle: React.CSSProperties = {
            height: rowHeight + "px"
        };
        let tableWidth = 0;
        for (let offset = 0; offset < midCount; offset++) {
            const index = topCount + offset;
            const item: any = data[index];
            const row: JSX.Element[] = [];

            let spaceColumnWidth = 1014;
            for (const column of columns) {
                const value = item ? item[column.id] : null;

                spaceColumnWidth -= column.width;
                if (offset === 0) {
                    tableWidth += column.width;
                }

                row.push(
                    <td 
                        key={column.id + index} 
                        style={{ ...cellStyle, width: column.width + "px" }}
                        className={_Styles.Cell}
                    >
                        {column.getValue ? column.getValue(value, item, column) : value}
                    </td>
                );
            }
            if (spaceColumnWidth > 0) {
                if (offset === 0) {
                    tableWidth += spaceColumnWidth;
                }
                row.push(
                    <td 
                        key="space-column" 
                        style={{ ...cellStyle, width: spaceColumnWidth + "px" }} 
                        className={_Styles.Cell}
                    />
                );
            }

            body.push(<tr key={index}>{row}</tr>);
        }
        tableWidth = tableWidth || 1014;

        // bot space
        if (botSpaceHeight) {
            body.push(<tr key="bottom-space" style={{ height: botSpaceHeight + "px" }} />);
        }

        // body
        const style: React.CSSProperties = {
            height: height + "px",
            width: tableWidth + "px",
        };
        return (
            <div className={_Styles.BodyComponent} style={style} onScroll={this.onScroll}>
                <table>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
        );
    }

    private onScroll(e: React.UIEvent) {
        this.setState({ scrollTop: e.currentTarget.scrollTop });
    }
}

namespace BodyComponent {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
        data: TItem[];
        tableHeight: number;
    }

    export interface IState {
        scrollTop: number;
    }
}

export default BodyComponent;
