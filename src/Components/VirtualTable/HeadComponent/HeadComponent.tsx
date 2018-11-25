import * as React from "react";
import * as Browser from "Utils/Browser";
import IColumn from "../IColumn";
import * as _Styles from "./HeadComponent.scss";

class HeadComponent<TItem> extends React.Component<HeadComponent.IProps<TItem>, HeadComponent.IState> {
    public constructor(props: HeadComponent.IProps<TItem>) {
        super(props);
        
        this.onResizerDragStart = this.onResizerDragStart.bind(this);
        this.onResizerMouseDown = this.onResizerMouseDown.bind(this);

        this.state = {
        };
    }

    public render() {
        const { columns } = this.props;

        let tableWidth = 0;
        let spaceColumnWidth = 1014;

        const columnCount = columns.length;
        const headerCells: JSX.Element[] = [];
        for (let index = 0; index < columnCount; index++) {
            const column = columns[index];
            const style: React.CSSProperties = {
                width: column.width + "px",
            };

            spaceColumnWidth -= column.width;
            tableWidth += column.width;

            headerCells.push(
                <td key={column.id} className={_Styles.HeaderCell} style={style}>
                    {column.title}
                    <span
                        className={_Styles.Resizer}
                        onDragStart={this.onResizerDragStart}
                        onMouseDown={(e) => this.onResizerMouseDown(e, index)}
                    />
                </td>
            );
        }

        if (spaceColumnWidth > 0) {
            tableWidth += spaceColumnWidth;
            headerCells.push(
                <td 
                    key="space-column" 
                    className={_Styles.HeaderCell} 
                    style={{ width: spaceColumnWidth + "px" }} 
                />
            );
        }

        const tableStyle: React.CSSProperties = {
            width: tableWidth + "px",
        };

        return (
            <div style={tableStyle} className={_Styles.HeadComponent}>
                <table>
                    <thead>
                        <tr>
                            {headerCells}
                        </tr>
                    </thead>
                </table>
            </div>
        );
    }

    private onResizerMouseDown(e: React.MouseEvent, columnIndex: number) {
        Browser.clearSelection();

        this.props.onResizerStart(e.pageX, columnIndex);
    }

    private onResizerDragStart(e: React.MouseEvent) {
        return false;
    }
}

namespace HeadComponent {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
        onResizerStart: (resizerX: number, columnIndex: number) => void;
    }

    export interface IState {
    }

    export const Styles = _Styles;
}

export default HeadComponent;
