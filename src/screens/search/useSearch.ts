import api from "@/api";
import { useSearchForm } from "@/screens/search/useSearchForm";
import { QueryKeys } from "@/utils/query-keys";
import * as Sentry from "@sentry/react-native";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useSearch = () => {
  const { searchTerm, debouncedSearchTerm, control, clearSearch } =
    useSearchForm();
  const {
    data: books,
    isLoading: booksLoading,
    isSuccess,
  } = useQuery({
    queryKey: QueryKeys.searchByTerm(debouncedSearchTerm),
    queryFn: () => api.catalog.search(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm && debouncedSearchTerm.length >= 3,
    select: (data) => data.data,
  });

  useEffect(() => {
    Sentry.metrics.increment("search");
  }, [isSuccess]);

  return { books, clearSearch, booksLoading, control, searchTerm };
};
