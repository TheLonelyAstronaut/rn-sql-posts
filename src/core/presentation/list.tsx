import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React, { createRef, forwardRef } from "react";
import { ActivityIndicator } from "react-native";

export type ListProps<T> = {
  data: Array<T>;
  keyExtractor: (i: T) => string;
  renderItem: ListRenderItem<T>;
  separator?: React.ComponentType;
  header?: React.ComponentType;
  itemSize?: number;
  loading?: boolean;
  onEndReached: () => void;
};

export class List<T> extends React.Component<ListProps<T>> {
  private scrollRef = createRef<FlashList<T>>();

  srollToItem = (item: T, offset = 80) => {
    this.scrollRef.current?.scrollToItem({
      animated: true,
      item,
      viewOffset: offset,
    });
  };

  render(): React.ReactNode {
    return (
      <FlashList
        ref={this.scrollRef}
        ItemSeparatorComponent={this.props.separator}
        ListHeaderComponent={this.props.header}
        contentInsetAdjustmentBehavior="automatic"
        data={this.props.data}
        keyExtractor={this.props.keyExtractor}
        renderItem={this.props.renderItem}
        estimatedItemSize={this.props.itemSize ?? 100}
        contentContainerStyle={{ padding: 16 }}
        onEndReached={this.props.onEndReached}
        ListFooterComponent={this.props.loading ? ActivityIndicator : undefined}
      />
    );
  }
}
