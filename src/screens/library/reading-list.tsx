import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { Check, MoreHorizontal, Share, Trash } from '@/icons'
import { useFinishBook } from '@/screens/reader/functions/useFinishBook'
import type { CompareReadingBook } from '@/store/reader/progress-store'
import { AnimatedIcon, Image, Title } from '@/ui'
import { settings } from '@/ui/book-card/settings'
import ProgressBar from '@/ui/progress-bar/progress-bar'
import SelectItem from '@/ui/select-list/select-list-item'
import { Color } from '@/utils/colors'
import { MutationKeys, QueryKeys } from '@/utils/query-keys'
import { shareBookWithAuthor } from '@/utils/share-text'
import { successToast } from '@/utils/toast'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UserLibraryOutputReadingBooksInner } from 'api-client'
import React, { type FC, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { JumpingTransition } from 'react-native-reanimated'

interface ReadingListProperties {
  data: CompareReadingBook[] | undefined;
}

export const ReadingList: FC<ReadingListProperties> = ({ data }) => {
  const queryClient = useQueryClient();
  const { navigate } = useTypedNavigation();
  const sheetReference = useRef<BottomSheetModal>(null);
  const { mutateAsync: removeFromLibrary } = useMutation({
    mutationKey: MutationKeys.book.removeFromLibrary,
    mutationFn: (slug: string) => api.user.removeFromLibrary(slug),
  });
  const [activeBookModalContent, setActiveBookModalContent] = useState<Omit<
    UserLibraryOutputReadingBooksInner,
    "readingHistory" | "rating"
  > | null>(null);

  const { onFinish, finishReadingLoading } = useFinishBook(() =>
    sheetReference.current?.dismiss(),
  );

  const onRemoveFromLibrary = async (slug: string) => {
    await removeFromLibrary(slug).then(() => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.library,
      });
    });
  };

  if (data?.length === 0) return null;
  return (
    <View className="bg-foreground border-bordered mb-0 ml-2 mt-4 rounded-[14px] rounded-r-none border-[1px] border-r-0  p-3 px-0">
      <View className="pl-4">
        <Title
          weight="bold"
          color={Color.white}
          onPress={() => {
            throw new Error("Check the error.");
          }}
        >
          Reading now
        </Title>
        <Title weight="regular" className="mb-4" size={"sm"} color={Color.gray}>
          {data?.length.toString()} books
        </Title>
      </View>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        layout={JumpingTransition}
        bounces={false}
        alwaysBounceHorizontal={false}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        data={data}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingBottom: 8,
        }}
        renderItem={({
          item: book,
        }) =>  (
          <Animated.View
            style={{
              width: settings.width.md,
            }}
          >
            <View className="relative">
              <View
                onTouchEnd={() => {
                  navigate("Reader", {
                    id: book.id,
                  });
                }}
              >
                <Image
                  width={settings.width.md}
                  height={settings.height.md}
                  url={book.picture}
                  className="mb-2"
                />
              </View>

              <View className="absolute bottom-4  w-full flex-row justify-between px-2">
                <View />
                <AnimatedIcon
                  icon={MoreHorizontal}
                  size={"sm"}
                  variant="muted"
                  onPress={() => {
                    setActiveBookModalContent(book);
                    sheetReference.current?.present(book);
                  }}
                />
              </View>
            </View>
            <ProgressBar
              progress={(book.lastHistory?.endProgress || 0)} />

            <Title numberOfLines={2} size="sm" weight="bold" className="mt-1">
              {book.title}
            </Title>
          </Animated.View>
        )}
      />

      <BottomSheetModal
        enableContentPanningGesture
        enableHandlePanningGesture
        enablePanDownToClose
        enableOverDrag
        index={0}
        ref={sheetReference}
        snapPoints={[300]}
        handleIndicatorStyle={{ backgroundColor: Color.gray }}
        style={{
          borderColor: Color.bordered,
          borderWidth: 1,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        backgroundStyle={{
          backgroundColor: Color.foreground,
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
          <View className="border-b-bordered w-full flex-row gap-5 pb-2">
            <Image
              width={50}
              height={70}
              borderRadius={4}
              url={activeBookModalContent?.picture}
            />
            <View className="max-w-[80%]">
              <Title size="xl" weight="bold">
                {activeBookModalContent?.title}
              </Title>
              <Title size="md" weight="regular" color={Color.gray}>
                {activeBookModalContent?.author.name}
              </Title>
            </View>
          </View>
          <View className="border-bordered border-t-2" />
          <View className="mt-2">
            <SelectItem
              icon={Share}
              title={"Share"}
              color={Color.white}
              onPress={() => {
                shareBookWithAuthor(
                  String(activeBookModalContent?.title),
                  String(activeBookModalContent?.author),
                );
                sheetReference.current?.dismiss();
              }}
            />

            <SelectItem
              icon={Check}
              title={"Mark as read"}
              color={Color.white}
              onPress={() => {
                if (activeBookModalContent?.id && !finishReadingLoading) {
                  onFinish(activeBookModalContent?.id).then(() => {
                    successToast("Book marked as read");
                  });
                  sheetReference.current?.dismiss();
                }
              }}
            />
            <SelectItem
              icon={Trash}
              title={"Remove from library"}
              color={Color.white}
              onPress={() => {
                if (activeBookModalContent?.id) {
                  onRemoveFromLibrary(activeBookModalContent?.id);
                  sheetReference.current?.dismiss();
                }
              }}
            />
          </View>
        </View>
      </BottomSheetModal>
    </View>
  );
};
