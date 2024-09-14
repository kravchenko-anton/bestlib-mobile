import api from "@/api";
import { Share, Trash } from "@/icons";
import type { ThemePackType } from "@/screens/reader/components/reader-customization/theme-pack";
import { Title } from "@/ui";
import SelectItem from "@/ui/select-list/select-list-item";
import { SvgButton } from "@/ui/svg-button/svg-button";
import { Color } from "@/utils/colors";
import { MutationKeys, QueryKeys } from "@/utils/query-keys";
import { reactions } from "@/utils/reactions";
import { shareReaction } from "@/utils/share-text";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Sentry from "@sentry/react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactionByBookOutput, UpdateReaction } from "api-client";
import React, { type FC, type RefObject } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export interface ReactionModalProperties {
  sheetRef: RefObject<BottomSheetModal>;
  colorScheme: ThemePackType;
  id: string;
  activeReactionPressed: ReactionByBookOutput | null;
}

export const ReactionInfo: FC<ReactionModalProperties> = ({
  sheetRef,
  activeReactionPressed,
  colorScheme,
  id,
}) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync: removeReactionMutation,
    isPending: removeReactionLoading,
  } = useMutation({
    mutationKey: MutationKeys.reaction.remove,
    mutationFn: (id: string) => api.reaction.remove(id),
  });
  const removeReaction = (id: string) => {
    if (removeReactionLoading) return;
    removeReactionMutation(id).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.reaction.byId(id),
      });
      sheetRef.current?.close();
    });
    Sentry.metrics.increment("remove-reaction");
  };

  const {
    mutateAsync: updateReactionMutation,
    isPending: updateReactionLoading,
  } = useMutation({
    mutationKey: MutationKeys.reaction.update,
    mutationFn: (dto: UpdateReaction) => api.reaction.update(dto),
  });
  const updateReaction = (dto: UpdateReaction) => {
    if (updateReactionLoading) return;
    updateReactionMutation(dto).then(async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.reaction.byId(id),
      });
      sheetRef.current?.close();
    });
    Sentry.metrics.increment("update-reaction");
  };

  return (
    <BottomSheetModal
      enableContentPanningGesture
      enableHandlePanningGesture
      enablePanDownToClose
      enableOverDrag
      index={0}
      ref={sheetRef}
      snapPoints={[250]}
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
      <View className="mx-4">
        <Title
          color={colorScheme.colorPalette.text}
          size={"xxl"}
          weight="bold"
          numberOfLines={2}
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
                      if (!activeReactionPressed) return;
                      updateReaction({
                        id: activeReactionPressed.id,
                        type: item.title,
                      });
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
            disabled={removeReactionLoading || !activeReactionPressed}
            title={"Delete"}
            style={{
              opacity:
                removeReactionLoading || !activeReactionPressed ? 0.5 : 1,
            }}
            onPress={() => {
              if (removeReactionLoading || !activeReactionPressed) return;
              removeReaction(activeReactionPressed.id);
            }}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
};
