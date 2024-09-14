import api from "@/api";
import { useTypedNavigation, useTypedRoute } from "@/hooks";
import { Loader, ScrollLayout } from "@/ui";
import CatalogList from "@/ui/book-lists/catalog-list";
import Header from "@/ui/header/header";
import { QueryKeys } from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";

const Genre = () => {
  const { params } = useTypedRoute<"Genre">();
  console.log("params", params);
  const { data: genre } = useQuery({
    queryKey: QueryKeys.genres.byId(params.id),
    queryFn: () => api.genre.byId(params.id),
    select: (data) => data.data,
  });
  const { navigate } = useTypedNavigation();
  return (
    <>
      <Header.Head>
        <Header.BackWithTitle title={params.name} />
      </Header.Head>

      {genre ? (
        <ScrollLayout>
          <CatalogList
            disabledScroll
            data={genre.books}
            onElementPress={(id) => navigate("Book", { id })}
          />
        </ScrollLayout>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Genre;
