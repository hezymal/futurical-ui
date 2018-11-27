import * as React from "react";
import * as Styles from "./VirtualTable.scss";
import IColumn from "./IColumn";
import ISort from "./ISort";
import HeadComponent from "./HeadComponent";
import BodyComponent from "./BodyComponent";
import * as Browser from "Utils/Browser";

namespace VirtualTable {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
        data: TItem[];
    }

    export interface IState<TItem> {
        columns: IColumn<TItem>[];
        width: number;
        height: number;
        headHeight: number;
        resizerIndex: number;
        resizerLeft: number;
        sort: ISort;
    }
}

const borderWidth = 2;

class VirtualTable<TItem> extends React.Component<VirtualTable.IProps<TItem>, VirtualTable.IState<TItem>> {
    private container: React.RefObject<HTMLDivElement>;
    private headElement: HTMLDivElement;

    public constructor(props: VirtualTable.IProps<TItem>) {
        super(props);

        this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
        this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
        this.onResizerStart = this.onResizerStart.bind(this);
        this.onHeadSort = this.onHeadSort.bind(this);
        this.onBodyScrollLeft = this.onBodyScrollLeft.bind(this);

        this.container = React.createRef();

        this.state = {
            columns: props.columns,
            width: -1,
            height: -1,
            headHeight: -1,
            resizerIndex: -1,
            resizerLeft: null,
            sort: null,
        };
    }

    public componentDidMount() {
        window.document.documentElement.addEventListener("mouseup", this.onDocumentMouseUp);
        window.document.documentElement.addEventListener("mousemove", this.onDocumentMouseMove);

        const container = this.container.current;
        const headElements = container.getElementsByClassName(HeadComponent.Styles.HeadComponent);
        this.headElement = headElements.item(0) as HTMLDivElement;
        
        this.setState({
            width: container.offsetWidth,
            height: container.offsetHeight,
            headHeight: this.headElement.offsetHeight,
        });
    }

    public componentWillUnmount() {
        window.document.documentElement.removeEventListener("mouseup", this.onDocumentMouseUp);
        window.document.documentElement.removeEventListener("mousemove", this.onDocumentMouseMove);
    }

    public render() {
        const { data } = this.props;
        const { columns, width, height, headHeight, sort } = this.state;

        return (
            <div className={Styles.VirtualTable} ref={this.container}>
                <HeadComponent
                    columns={columns}
                    containerWidth={width - borderWidth}
                    sort={sort}
                    onResizerStart={this.onResizerStart}
                    onSort={this.onHeadSort}
                />
                {width !== -1 && <BodyComponent
                    columns={columns}
                    data={data}
                    containerWidth={width - borderWidth}
                    sort={sort}
                    height={height - headHeight - borderWidth}
                    onScrollLeft={this.onBodyScrollLeft}
                />}
            </div>
        );
    }

    private onDocumentMouseMove(e: MouseEvent) {
        const resizerIndex = this.state.resizerIndex;
        
        if (resizerIndex !== -1) {
            Browser.clearSelection();

            const resizerLeft = this.state.resizerLeft;
            const columns = this.state.columns;
            
            const newResizerLeft = e.pageX;
            const newColumns = columns.map((column, columnIndex) => {
                if (columnIndex === resizerIndex) {
                    const newWidth = column.width + (newResizerLeft - resizerLeft);

                    return { ...column, width: newWidth };
                } else {
                    return column;
                }
            });

            this.setState({ resizerLeft: newResizerLeft, columns: newColumns });
        }
    }

    private onDocumentMouseUp(e: MouseEvent) {
        const resizerIndex = this.state.resizerIndex;

        if (resizerIndex !== -1) {
            Browser.clearSelection();

            this.setState({ resizerIndex: -1 });
        }
    }

    private onResizerStart(resizerLeft: number, resizerIndex: number) {
        this.setState({ resizerLeft, resizerIndex });
    }

    private onHeadSort(columnId: string) {
        const sort = this.state.sort;
        const newSort = 
            !sort ? { columnId, desc: false } : 
            columnId !== sort.columnId ? { columnId, desc: sort.desc } : 
            !sort.desc ? { columnId, desc: true }
            : null;

        this.setState({ sort: newSort });
    }

    private onBodyScrollLeft(scrollLeft: number) {
        this.headElement.scrollLeft = scrollLeft;
    }
}

export default VirtualTable;