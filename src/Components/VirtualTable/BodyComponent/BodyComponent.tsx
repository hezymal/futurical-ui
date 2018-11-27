import * as React from "react";
import IColumn from "../IColumn";
import ISort from "../ISort";
import * as _Styles from "./BodyComponent.scss";

const rowHeight = 36;
const scrollWidth = 17;

class BodyComponent<TItem> extends React.Component<BodyComponent.IProps<TItem>, BodyComponent.IState<TItem>> {
    public constructor(props: BodyComponent.IProps<TItem>) {
        super(props);

        this.onScroll = this.onScroll.bind(this);
        this.getDataOfProps = this.getDataOfProps.bind(this);

        this.state = {
            scrollTop: 0,
            data: this.getDataOfProps(props),
        };
    }

    public componentWillReceiveProps(nextProps: BodyComponent.IProps<TItem>) {
        this.setState({ 
            data: this.getDataOfProps(nextProps),
        });
    }

    public render() {
        const {
            columns,
            containerWidth,
            height,
        } = this.props;

        const {
            data,
            scrollTop,
        } = this.state;

        const body: JSX.Element[] = [];

        // calculate indexes and sizes
        const topCount = Math.floor(scrollTop / rowHeight);
        const middleCount = Math.ceil((scrollTop + height) / rowHeight) - topCount;
        const bottomCount = data.length - topCount - middleCount;

        const topSpaceHeight = topCount * rowHeight;
        const bottomSpaceHeight = bottomCount * rowHeight;

        // top space
        if (topSpaceHeight) {
            body.push(<tr key="top-space" style={{ height: topSpaceHeight + "px" }} />);
        }

        // middle content
        let width = 0;
        for (let offset = 0; offset < middleCount; offset++) {
            const index = topCount + offset;
            const item: any = data[index];
            const row: JSX.Element[] = [];

            for (const column of columns) {
                const value = item ? item[column.id] : null;

                if (offset === 0) {
                    width += column.width;
                }

                row.push(
                    <td 
                        key={column.id + index} 
                        style={{ width: column.width + "px" }}
                        className={_Styles.Cell}
                    >
                        {column.getValue ? column.getValue(value, item, column) : value}
                    </td>
                );
            }

            if (containerWidth > width) {
                row.push(
                    <td 
                        key="space-column" 
                        style={{ width: containerWidth - width - scrollWidth + "px" }} 
                        className={_Styles.Cell}
                    />
                );
            }

            body.push(<tr key={index} style={{ height: rowHeight + "px" }}>{row}</tr>);
        }

        if (containerWidth > width) {
            width = containerWidth;
        }

        // bottom space
        if (bottomSpaceHeight) {
            body.push(<tr key="bottom-space" style={{ height: bottomSpaceHeight + "px" }} />);
        }

        return (
            <div className={_Styles.BodyComponent} style={{ height: height + "px" }} onScroll={this.onScroll}>
                <table style={{ width: width - scrollWidth + "px" }}>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
        );
    }

    private onScroll(e: React.UIEvent) {
        const { scrollTop, scrollLeft } = e.currentTarget;

        this.setState({ scrollTop });
        this.props.onScrollLeft(scrollLeft);
    }

    private getDataOfProps(props: BodyComponent.IProps<TItem>) {
        const { sort, data } = props;

        if (sort) {
            const { columnId, desc } = sort;

            return data.slice().sort((item1: TItem, item2: TItem) => {
                const value1 = (item1 as any)[columnId] + "";
                const value2 = (item2 as any)[columnId] + "";
                const result = value1.localeCompare(value2);
        
                return !desc ? result : (result === -1 ? +1 : result === 0 ? 0 : -1);
            });
        }

        return data;
    }
}

namespace BodyComponent {
    export interface IProps<TItem> {
        columns: IColumn<TItem>[];
        data: TItem[];
        containerWidth: number;
        height: number;
        sort: ISort;
        onScrollLeft: (scrollLeft: number) => void;
    }

    export interface IState<TItem> {
        scrollTop: number;
        data: TItem[];
    }
}

export default BodyComponent;
