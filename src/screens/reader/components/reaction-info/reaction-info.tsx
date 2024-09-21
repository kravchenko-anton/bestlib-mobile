import { Share, Trash } from '@/icons'
import type { ReactionStoreActionsType } from '@/store/reader/reaction-store'
import type { ThemePackType } from '@/store/reader/theme-pack'
import { Title } from '@/ui'
import SelectItem from '@/ui/select-list/select-list-item'
import { SvgButton } from '@/ui/svg-button/svg-button'
import { Color } from '@/utils/colors'
import { reactions } from '@/utils/reactions'
import { shareReaction } from '@/utils/share-text'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import type { ReactionByBookOutput } from 'api-client'
import React, { type FC, type RefObject } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export interface ReactionModalProperties extends Omit<ReactionStoreActionsType, 'findReactionById'>{
  sheetRef: RefObject<BottomSheetModal>;
  colorScheme: ThemePackType;
  id: string;
}


export const ReactionInfo: FC<ReactionModalProperties> = ({
  sheetRef,
  colorScheme,
  updateReaction,
  deleteReaction,
}) => {
  return (
    <BottomSheetModal
      enableContentPanningGesture
      enableHandlePanningGesture
      enablePanDownToClose
      enableOverDrag
      index={0}
      ref={sheetRef}
      snapPoints={[280]}
      handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
      style={{
        borderColor: Color.bordered,
        borderWidth: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
      backgroundStyle={{
        backgroundColor: colorScheme.colorPalette.background.darker,
      }}
      backdropComponent={(backdropProperties) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...backdropProperties}
          enableTouchThrough
        />
      )}
    >
      {(data:any) => {
        const activeReactionPressed: ReactionByBookOutput = data?.activeReactionPressed
        return (
          <View className="mx-4">
            <Title
              color={colorScheme.colorPalette.text}
              size={"xl"}
              weight="bold"
              numberOfLines={3}
            >
              {activeReactionPressed?.text}
            </Title>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={reactions}
              className="border-b-2 pb-1 pt-2"
              style={{
                borderColor: colorScheme.colorPalette.background.lighter,
              }}
              renderItem={({ item }) => (
                <SvgButton
                  className="mb-1.5 mr-2 mt-2 px-3"
                  altEmoji={item.altEmoji}
                  title={item.title}
                  svgUri={item.svg}
                  size="sm"
                  style={{
                    borderColor: Color.transparent,
                    backgroundColor:
                      activeReactionPressed?.type === item.title
                        ? colorScheme.colorPalette.mark.hoverBackground
                        : colorScheme.colorPalette.mark.background,
                  }}
                  onPress={
                    activeReactionPressed?.type === item.title
                      ? undefined
                      : () => {
                          if (!activeReactionPressed)
                            return console.error("No active reaction");
                          updateReaction(
                            activeReactionPressed.id,
                            {
                              type: item.title
                            }
                          );
                          sheetRef.current?.close();
                        }
                  }
                />
              )}
            />
            <View className="mt-2">
              <SelectItem
                icon={Share}
                title={"Share"}
                color={colorScheme.colorPalette.text}
                onPress={async () => {
                  await shareReaction(String(activeReactionPressed?.text));
                }}
              />
              <SelectItem
                icon={Trash}
                color={colorScheme.colorPalette.text}
                title={"Delete"}
                onPress={() => {
                  if (!activeReactionPressed) return;
                  deleteReaction(activeReactionPressed.id);
                  sheetRef.current?.close();
                }}
              />
            </View>
          </View>
        );
      }}
    </BottomSheetModal>
  );
};
