interface IColumn<TItem> {
    id: string;
    title: string;
    width: number;
    getValue?: (value: any, item: TItem, column: IColumn<TItem>) => any;
}

export default IColumn;
