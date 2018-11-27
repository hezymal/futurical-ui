import * as React from "react";
import classnames from "classnames";
import * as Browser from "Utils/Browser";
import IColumn from "../IColumn";
import ISort from "../ISort";
import * as _Styles from "./HeadComponent.scss";

class HeadComponent<TItem> extends React.Component<HeadComponent.IProps<TItem>, HeadComponent.IState> {
    public constructor(props: HeadComponent.IProps<TItem>) {
        super(props);
        
        this.onResizerDragStart = this.onResizerDragStart.bind(this);
        this.onResizerMouseDown = this.onResizerMouseDown.bind(this);

        this.state = {};
    }

    public render() {
        const { columns, containerWidth, sort } = this.props;
        let width = 0;
        
        const headerCells: JSX.Element[] = [];
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            const className = classnames(_Styles.HeaderCell, {
                [_Styles.IsAscSorted]: sort && sort.columnId === column.id && !sort.desc,
                [_Styles.IsDescSorted]: sort && sort.columnId === column.id && sort.desc,
            });
            const style: React.CSSProperties = {
                width: column.width + "px"
            };

            width += column.width;

            headerCells.push(
                <td key={column.id} className={className} style={style}>
                    <i onClick={() => this.props.onSort(column.id)}>{column.title}</i>
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
                    style={{ width: containerWidth - width + "px" }} 
                />
            );

            width = containerWidth;
        }

        return (
            <div className={_Styles.HeadComponent}>
                <table style={{ width }}>
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
        sort: ISort;
        onResizerStart: (resizerX: number, columnIndex: number) => void;
        onSort: (columnId: string) => void;
    }

    export interface IState {}

    export const Styles = _Styles;
}

export default HeadComponent;
