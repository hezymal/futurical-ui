import * as React from "react";

function clearSelection() {
    if (window.getSelection().empty) {
        window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
        window.getSelection().removeAllRanges();
    }
}

interface IColumn<TItem> {
    id: string;
    title: string;
    width: number;
    getValue?: (value: any, item: TItem, column: IColumn<TItem>) => any;
}

namespace HeadComponent {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
    }

    export interface IState<TItem> {
        columns: IColumn<TItem>[];
        resizerIndex: number;
        resizerPosition: number[];
    }
}

namespace BodyComponent {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
        data: TItem[];
        tableHeight: number;
        rowHeight?: number;
    }

    export interface IState {
        scrollTop: number;
    }
}

namespace VirtualTable {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
        data: TItem[];
        height: number;
        rowHeight?: number;
    }

    export interface IState {
    }
}

const headerHeight = 50;

class HeadComponent<TItem> extends React.Component<HeadComponent.IProps<TItem>, HeadComponent.IState<TItem>> {
    public constructor(props: HeadComponent.IProps<TItem>) {
        super(props);

        this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
        this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
        this.onResizerDragStart = this.onResizerDragStart.bind(this);
        this.onResizerMouseDown = this.onResizerMouseDown.bind(this);

        this.state = {
            columns: props.columns,
            resizerIndex: -1,
            resizerPosition: [],
        };
    }

    public componentWillMount() {
        window.document.documentElement.addEventListener("mouseup", this.onDocumentMouseUp);
        window.document.documentElement.addEventListener("mousemove", this.onDocumentMouseMove);
    }

    public componentWillUnmount() {
        window.document.documentElement.removeEventListener("mouseup", this.onDocumentMouseUp);
        window.document.documentElement.removeEventListener("mousemove", this.onDocumentMouseMove);
    }

    public render() {
        const { columns } = this.state;

        const tableStyle: React.CSSProperties = {
            border: "none",
            borderSpacing: 0,
            width: "100%",
            height: headerHeight + "px",
        };

        const headerCellStyle: React.CSSProperties = {
            position: "relative",
            height: headerHeight + "px",
            margin: 0,
            padding: "0 5px",
        };

        const resizerStyle: React.CSSProperties = {
            position: "absolute",
            top: "0px",
            right: "0px",
            display: "inline-block",
            width: "6px",
            height: "100%",
            cursor: "e-resize",
            backgroundColor: "black"
        };

        // draw headers
        const headers: JSX.Element[] = [];
        const columnCount = columns.length;
        let spaceColumnWidth = 1024;
        for (let index = 0; index < columnCount; index++) {
            const column = columns[index];

            spaceColumnWidth -= column.width;

            headers.push(
                <td key={column.id} style={{ ...headerCellStyle, width: column.width }}>
                    {column.title}
                    <span
                        style={resizerStyle}
                        onDragStart={this.onResizerDragStart}
                        onMouseDown={(e) => this.onResizerMouseDown(e, index)}
                    />
                </td>
            );
        }
        if (spaceColumnWidth > 0) {
            headers.push(
                <td key="space-column" style={{ ...headerCellStyle, width: spaceColumnWidth }} />
            );
        }

        return (
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
            </table>
        );
    }

    private onResizerMouseDown(e: React.MouseEvent, index: number) {
        console.log("down", e.pageX);

        clearSelection();

        this.setState({
            resizerIndex: index,
            resizerPosition: [e.pageX, e.pageY],
        });
    }

    private onDocumentMouseMove(e: MouseEvent) {

        
        const resizerIndex = this.state.resizerIndex;
        
        if (resizerIndex !== -1) {
            clearSelection();

            const { pageX, pageY } = e;
            const [posX, posY] = this.state.resizerPosition;
            const columns = this.state.columns;

            console.log("up", pageX);

            this.setState({
                //resizerIndex: -1,
                resizerPosition: [e.pageX, e.pageY],
                columns: columns.map((column, index) => {
                    if (index === resizerIndex) {
                        const newWidth = column.width + (pageX - posX);

                        return { ...column, width: newWidth };
                    }

                    return column;
                }),
            });
        }

    }

    private onResizerDragStart(e: React.MouseEvent) {
        return false;
    }

    private onDocumentMouseUp(e: MouseEvent) {
        const resizerIndex = this.state.resizerIndex;
        if (resizerIndex !== -1) {
            clearSelection();

            console.log("up");

            this.setState({
                resizerIndex: -1,
            });
        }
    }
}

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
            rowHeight = 50,
        } = this.props;

        const {
            scrollTop,
        } = this.state;

        const body: JSX.Element[] = [];

        // calculate indexes and sizes
        const height = tableHeight - headerHeight;
        const topCount = Math.floor(scrollTop / rowHeight);
        const middleCount = Math.ceil((scrollTop + height) / rowHeight) - topCount;
        const endCount = data.length - topCount - middleCount;

        // top space
        const topSpaceStyle = {
            backgroundColor: "green",
            height: (topCount * rowHeight) + "px",
            margin: 0,
            padding: 0,
        };
        body.push(
            <tr key="top-space">
                <td colSpan={columns.length} style={topSpaceStyle} />
            </tr>
        );

        // middle
        const cellStyle: React.CSSProperties = {
            height: rowHeight + "px",
            margin: 0,
            padding: 0,
        };
        for (let offset = 0; offset < middleCount; offset++) {
            const index = topCount + offset;
            const item: any = data[index];
            const row: JSX.Element[] = [];

            for (const column of columns) {
                const value = item ? item[column.id] : null;

                row.push(
                    <td key={column.id + index} style={cellStyle}>
                        {column.getValue ? column.getValue(value, item, column) : value}
                    </td>
                );
            }

            body.push(<tr key={index}>{row}</tr>);
        }

        // bottom space
        const bottomSpaceStyle: React.CSSProperties = {
            backgroundColor: "green",
            height: endCount * rowHeight + "px",
            margin: 0,
            padding: 0,
        };
        body.push(
            <tr key="bottom-space">
                <td colSpan={columns.length} style={bottomSpaceStyle} />
            </tr>
        );

        // body
        const style: React.CSSProperties = {
            height: height + "px",
            overflow: "auto",
        };
        const tableStyle: React.CSSProperties = {
            border: "none",
            borderSpacing: 0,
            width: "100%",
        };
        return (
            <div style={style} onScroll={this.onScroll}>
                <table style={tableStyle}>
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

class VirtualTable<TItem> extends React.Component<VirtualTable.IProps<TItem>, VirtualTable.IState> {
    public constructor(props: VirtualTable.IProps<TItem>) {
        super(props);

        this.state = {};
    }

    public render() {
        const {
            columns,
            data,
            height,
            rowHeight,
        } = this.props;

        const style: React.CSSProperties = {
            height: height + "px",
        };

        return (
            <div style={style}>
                <HeadComponent
                    columns={columns}
                />
                <BodyComponent
                    columns={columns}
                    data={data}
                    tableHeight={height}
                    rowHeight={rowHeight}
                />
            </div>
        );
    }
}

export default VirtualTable;