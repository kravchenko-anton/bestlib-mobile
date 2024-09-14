import api from "@/api";
import { useTypedNavigation, useTypedRoute } from "@/hooks";
import { ArrowLeft } from "@/icons";
import {
  AnimatedIcon,
  BookCard,
  Description,
  Image,
  Loader,
  ScrollLayout,
  Title,
} from "@/ui";
import BannerList from "@/ui/book-lists/banner-list";
import { Color } from "@/utils/colors";
import { QueryKeys } from "@/utils/query-keys";

import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { View } from "react-native";

const Author: FC = () => {
  const { params } = useTypedRoute<"Author">();
  const { data: author } = useQuery({
    queryKey: QueryKeys.author.byId(params.id),
    queryFn: () => api.author.byId(params.id),
    select: (data) => data.data,
  });

  const { navigate, goBack } = useTypedNavigation();
  if (!author) return <Loader />;
  return (
    <ScrollLayout>
      <View className="z-50 items-center justify-between overflow-hidden rounded-b-none rounded-t-2xl px-2 pb-4 pt-2">
        <View className="mt-1 w-full flex-row items-start justify-between">
          <AnimatedIcon
            variant="foreground"
            icon={ArrowLeft}
            size="sm"
            onPress={() => goBack()}
          />
        </View>
        <Image
          url={author.picture}
          height={50}
          className="mx-auto -mt-5"
          width={50}
          style={{
            borderRadius: 1000,
            borderWidth: 1,
            borderColor: Color.bordered,
          }}
        />
      </View>

      <View className="px-2 pt-2">
        <Title numberOfLines={2} weight="bold" size={"xl"}>
          {author.name}
        </Title>
        <Title
          numberOfLines={1}
          color={Color.gray}
          weight="regular"
          size={"sm"}
        >
          {author.description}
        </Title>
      </View>

      <Title size="xl" weight="bold" className="mt-4 px-2">
        Detailed information
      </Title>

      <Description size={16} className="mt-1 px-2 pb-8" weight="light">
        {author.description}
      </Description>

      <BannerList
        title="From the same author"
        data={author.books}
        renderItem={({ item: book }) => (
          <BookCard
            size="md"
            image={{
              uri: book.picture,
            }}
            onPress={() => navigate("Book", { id: book.id })}
          />
        )}
      />
    </ScrollLayout>
  );
};

export default Author;
