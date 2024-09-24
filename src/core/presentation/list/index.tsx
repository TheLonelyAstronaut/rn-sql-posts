import { FlashList, ListRenderItem } from '@shopify/flash-list';
export * from './default-separator.component';

export type ListProps<T> = {
    data: Array<T>,
    keyExtractor: (i: T) => string;
    renderItem: ListRenderItem<T>;
    separator?: React.ComponentType;
    itemSize?: number;
}

export const List = <T, >(props: ListProps<T>) => {
    return <FlashList ItemSeparatorComponent={props.separator} contentInsetAdjustmentBehavior='automatic' data={props.data} keyExtractor={props.keyExtractor} renderItem={props.renderItem} estimatedItemSize={props.itemSize ?? 100} contentContainerStyle={{ padding: 16 }} />
}