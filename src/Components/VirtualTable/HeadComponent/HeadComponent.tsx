import * as React from "react";
import * as Browser from "Utils/Browser";
import IColumn from "../IColumn";
import * as _Styles from "./HeadComponent.scss";

class HeadComponent<TItem> extends React.Component<HeadComponent.IProps<TItem>, HeadComponent.IState> {
    public constructor(props: HeadComponent.IProps<TItem>) {
        super(props);
        
        this.onResizerDragStart = this.onResizerDragStart.bind(this);
        this.onResizerMouseDown = this.onResizerMouseDown.bind(this);

        this.state = {};
    }

    public render() {
        const { columns, containerWidth } = this.props;
        let width = 0;
        
        const headerCells: JSX.Element[] = [];
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];

            width += column.width;

            headerCells.push(
                <td key={column.id} className={_Styles.HeaderCell} style={{ width: column.width + "px" }}>
                    {column.title}
                    <span
                        className={_Styles.Resizer}
                        onDragStart={this.onResizerDragStart}
                        onMouseDown={(e) => this.onResizerMouseDown(e, index)}
                    />
                </td>
            );
        }

        if (containerWidth > width) {
            headerCells.push(
                <td 
                    key="space-column" 
                    className={_Styles.HeaderCell} 
                    style={{ width: `calc(100% - ${width}px)` }} 
                />
            );
        }

        return (
            <div className={_Styles.HeadComponent}>
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
        containerWidth: number;
        onResizerStart: (resizerX: number, columnIndex: number) => void;
    }

    export interface IState {}

    export const Styles = _Styles;
}

export default HeadComponent;
