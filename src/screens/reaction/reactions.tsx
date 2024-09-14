import api from "@/api";
import { useTypedNavigation, useTypedRoute } from "@/hooks";
import { Close } from "@/icons";
import type { SearchFormDataType } from "@/screens/search/useSearchForm";
import { Button, Flatlist, Loader, Title } from "@/ui";
import { SvgButton } from "@/ui/svg-button/svg-button";
import { fontSettings } from "@/ui/title/settings";
import { cn } from "@/utils";
import { Color } from "@/utils/colors";
import { MutationKeys, QueryKeys } from "@/utils/query-keys";
import { reactions } from "@/utils/reactions";
import { shareReaction } from "@/utils/share-text";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";

dayjs.extend(relativeTime);

const Reactions = () => {
  const queryClient = useQueryClient();
  const { params } = useTypedRoute<"Reactions">();
  const {
    data: userReactions = [],
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: QueryKeys.reaction.byId(params.id),
    queryFn: () => api.reaction.reactionByBook(params.id),
    select: (data) => data.data,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const {
    mutateAsync: removeReactionMutation,
    isPending: removeReactionLoading,
  } = useMutation({
    mutationKey: MutationKeys.reaction.remove,
    mutationFn: (id: string) => api.reaction.remove(id),
  });
  const [filterSettings, setFilterSettings] = React.useState({
    search: "",
    reaction: "",
  });
  const { control, watch, reset } = useForm<SearchFormDataType>({
    mode: "onChange",
    defaultValues: {
      searchTerm: "",
    },
  });

  const clearSearch = () => reset({ searchTerm: "" });

  const searchTerm = watch("searchTerm");
  const { goBack } = useTypedNavigation();
  if (!userReactions || isLoading) return <Loader />;
  return (
    <View className="bg-background h-screen w-screen">
      <Controller
        control={control}
        name="searchTerm"
        render={({ field: { value, onChange, onBlur } }) => (
          <View className="border-bordered border-b-[1px]">
            <View className=" w-full flex-row items-center justify-between px-2">
              <View className="w-3/4 flex-row items-center">
                <Close
                  width={25}
                  height={25}
                  color={Color.white}
                  onPress={goBack}
                />
                <TextInput
                  renderToHardwareTextureAndroid
                  autoCapitalize="none"
                  className="ml-2 w-full"
                  value={value}
                  placeholderTextColor={Color.gray}
                  placeholder="Type something to search"
                  keyboardAppearance="dark"
                  style={{
                    fontFamily: fontSettings.bold,
                    color: Color.white,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              </View>

              <Button
                className={cn(!searchTerm && "hidden")}
                variant="foreground"
                size="sm"
                onPress={() => clearSearch()}
              >
                Clear
              </Button>
            </View>
          </View>
        )}
      />
      <View className="pt-2">
        <Flatlist
          horizontal
          mt={0}
          data={[
            {
              title: "all",
              alt: "all",
              svg: "",
              altEmoji: "",
            },
            ...reactions,
          ]}
          renderItem={({ item }) => {
            if (item.title === "all") {
              return (
                <Button
                  size="sm"
                  className="px-3"
                  variant={
                    filterSettings.reaction === "" ? "muted" : "foreground"
                  }
                  onPress={() =>
                    setFilterSettings({
                      ...filterSettings,
                      reaction: "",
                    })
                  }
                >
                  All
                </Button>
              );
            }
            return (
              <SvgButton
                className="px-3"
                altEmoji={item.altEmoji}
                title={item.title}
                svgUri={item.svg}
                size="sm"
                variant={
                  filterSettings.reaction === item.title
                    ? "muted"
                    : "foreground"
                }
                onPress={() =>
                  setFilterSettings({
                    ...filterSettings,
                    reaction: item.title,
                  })
                }
              />
            );
          }}
        />
      </View>
      <Flatlist
        mt={2}
        ListEmptyComponent={() => (
          <Title
            className="mx-auto"
            size={"md"}
            color={Color.gray}
            weight="medium"
          >
            It's quiet, too quiet
          </Title>
        )}
        data={userReactions.filter(
          (reaction) =>
            reaction?.text?.includes(searchTerm) &&
            (filterSettings.reaction === "" ||
              reaction.type === filterSettings.reaction),
        )}
        renderItem={({ item }) => {
          const emoji = reactions.find(
            (reaction) => reaction.title === item.type,
          );

          return (
            <View className="bg-muted border-bordered mx-2 rounded-lg border-[1px] p-2 py-2">
              <Title
                size="md"
                className="mb-2"
                numberOfLines={2}
                color={Color.white}
              >
                {item.text}
              </Title>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  {emoji ? (
                    <SvgButton
                      size="sm"
                      title={item.type}
                      altEmoji={emoji?.altEmoji}
                      svgUri={emoji?.svg}
                      variant={"foreground"}
                      onPress={() => {
                        setFilterSettings({
                          ...filterSettings,
                          reaction: item.type,
                        });
                      }}
                    />
                  ) : null}
                  <Title size="sm" numberOfLines={1} color={Color.gray}>
                    {dayjs(item.createdAt).fromNow()} ago
                  </Title>
                </View>
                <View className="mt-2 flex-row items-center">
                  <Button
                    size={"sm"}
                    variant="foreground"
                    className="mr-2"
                    onPress={() => {
                      shareReaction(item.text);
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size={"sm"}
                    variant="foreground"
                    disabled={
                      removeReactionLoading || isLoading || isRefetching
                    }
                    onPress={() => {
                      if (removeReactionLoading || isLoading) return;
                      removeReactionMutation(item.id).then(() => {
                        queryClient.invalidateQueries({
                          queryKey: QueryKeys.reaction.byId(params.id),
                        });
                        queryClient.invalidateQueries({
                          queryKey: QueryKeys.reaction.list,
                        });
                      });
                    }}
                  >
                    Delete
                  </Button>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Reactions;
