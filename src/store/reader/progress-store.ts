import { historyByLatestSorting } from '@/utils'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import dayjs from 'dayjs'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export interface ReadingHistoryType {
  bookId: string;
  id: string;
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
  localHistory: ReadingHistoryType[];
  syncedHistory: ReadingHistoryType[];
}

const initialState: ReadingProgressStoreType = {
  localHistory: [],
  syncedHistory: [],
};

interface ReadingProgressStoreActionsType {
  newProgress: (history: ReadingHistoryType) => void;
  lastHistoryByBookId: (bookId: string) => ReadingHistoryType | undefined;
  getInitialHistory: () => ReadingHistoryType | undefined;
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
      getInitialHistory: () => {
        const history = [...getState().localHistory, ...getState().syncedHistory]
        const sortedHistory = historyByLatestSorting(history).find(
          (h) => h.startFromReadingScreen,
        )
        
        return sortedHistory
      },
      lastHistoryByBookId: (bookId) =>
  [...getState().localHistory, ...getState().syncedHistory]
          .filter((h) => h.bookId === bookId)[0],
      newProgress: (newHistory) => {
        const allHistory =getState().localHistory
        const isSameDay = allHistory.some(
          (h) =>
            dayjs(h.startDate).isSame(newHistory.startDate, "day") &&
            h.bookId === newHistory.bookId,
        )
        if (isSameDay) {
          console.log("⚠️ update progress, its same day", {
            id: newHistory.id,
            readTime: newHistory.readingTimeMs,
          });
          return set((state) => ({
            ...state,
            localHistory: state.localHistory.map(({ ...h }) =>
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
          localHistory: [...state.localHistory, newHistory],
        }));
      },
      updateStartFromReadingScreen: (
        data: Pick<ReadingHistoryType, "id" | "startFromReadingScreen">,
      ) =>
        set((state) => ({
          ...state,
          localHistory: state.localHistory .map(({ ...h }) =>
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
