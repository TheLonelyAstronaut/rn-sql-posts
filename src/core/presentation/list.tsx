import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { ActivityIndicator } from "react-native";

export type ListProps<T> = {
  data: Array<T>;
  keyExtractor: (i: T) => string;
  renderItem: ListRenderItem<T>;
  separator?: React.ComponentType;
  header?: React.ComponentType;
  itemSize?: number;
  loading?: boolean;
};

export const List = <T,>(props: ListProps<T>) => {
  return (
    <FlashList
      ItemSeparatorComponent={props.separator}
      ListHeaderComponent={props.header}
      contentInsetAdjustmentBehavior="automatic"
      data={props.data}
      keyExtractor={props.keyExtractor}
      renderItem={props.renderItem}
      estimatedItemSize={props.itemSize ?? 100}
      contentContainerStyle={{ padding: 16 }}
      ListFooterComponent={props.loading ? ActivityIndicator : undefined}
    />
  );
};
