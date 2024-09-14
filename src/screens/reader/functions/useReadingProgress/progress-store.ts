import { zustandStorage } from "@/utils/mmkv-wrapper";
import type { UserLibraryOutput, UserStatistics } from "api-client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CompareReadingBooksType = {};
export type libraryType =
  | (Omit<UserLibraryOutput, "readingBooks"> & {
      readingBooks: CompareReadingBooksType[];
    })
  | null;

export interface ReadingHistoryType {
  id: string;
  bookId: string;
  startProgress: number;
  endProgress: number;
  progressDelta: number;
  scrollPosition: number;
  startDate: string;
  endDate: string;
  readingTimeMs: number;
  startFromReadingScreen: boolean;
}
interface ReadingProgressStoreType {
  history: ReadingHistoryType[];
  statistics: UserStatistics | null;
  library: libraryType;
}

const initialState: ReadingProgressStoreType = {
  history: [],
  statistics: null,
  library: null,
};

interface ReadingProgressStoreActionsType {
  newProgress: (history: ReadingHistoryType) => void;
  clearHistory: () => void;
  updateStartFromReadingScreen: (
    data: Pick<ReadingHistoryType, "id"> & { startFromReadingScreen: boolean },
  ) => void;
}
export const useReadingProgressStore = create<
  ReadingProgressStoreType & ReadingProgressStoreActionsType
>()(
  persist(
    (set, getState) => ({
      ...initialState,
      newProgress: (newHistory) => {
        const history = getState().history;
        if (history.some((h) => h.id === newHistory.id)) {
          console.log("⚠️ update progress", {
            id: newHistory.id,
            readTime: newHistory.readingTimeMs,
          });
          return set((state) => ({
            ...state,
            history: state.history.map(({ ...h }) =>
              h.id === newHistory.id ? newHistory : h,
            ),
          }));
        }

        console.log("⚠️ new progress", {
          id: newHistory.id,
          readTime: newHistory.readingTimeMs,
        });
        set((state) => ({
          ...state,
          needSync: true,
          history: [...state.history, newHistory],
        }));
      },
      clearHistory: () =>
        set(({ history, ...state }) => ({ ...state, history: [] })),
      updateStartFromReadingScreen: (
        data: Pick<ReadingHistoryType, "id" | "startFromReadingScreen">,
      ) =>
        set((state) => ({
          ...state,
          history: state.history.map(({ ...h }) =>
            h.id === data.id
              ? { ...h, startFromReadingScreen: data.startFromReadingScreen }
              : h,
          ),
        })),
    }),
    {
      name: "reading-progress-storage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
