import React from 'react';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { TrailListItem } from './TrailListItem';

const TrailBottomSheet = ({ trails }) => {
  return (
    <BottomSheetFlatList
      data={trails}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <TrailListItem trail={item} />}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};