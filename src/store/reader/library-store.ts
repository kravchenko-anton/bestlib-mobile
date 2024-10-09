import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { UserLibraryOutputReadingBooksInner } from '../../../api-client'


export interface LibraryBookType extends Omit<UserLibraryOutputReadingBooksInner, 'rating'>{
	status: "reading" | "finished" | "saved"
}

export type BookToAddType = Pick<LibraryBookType, 'id' | 'title' | 'author' | 'picture'>

export type ShortLibraryBookType = Pick<LibraryBookType, 'status' | 'id'>

export interface LibraryStoreType {
	books: LibraryBookType[]
	hot: {
		create: ShortLibraryBookType[]
		update: ShortLibraryBookType[]
		delete: string[]
	}
	lastSyncedAt: Date | null
}

const initialState: LibraryStoreType = {
	books: [],
	lastSyncedAt: null,
	hot: {
		create: [],
		update: [],
		delete: []
	}
}

export interface LibraryStoreActionsType {
	syncLibrary: (
		syncWithCurrentDay?: boolean
	) => Promise<void>
	getLibraryCatalog: () => {
		readingBooks: LibraryBookType[]
		finishedBooks: LibraryBookType[]
		savedBooks: LibraryBookType[]
	}
	toggleSave: (book: BookToAddType) => void
	startReading: (book: BookToAddType) => void
	finishReading: (book: BookToAddType) => void
	isSaved: (id: string) => boolean
	removeFromLibrary: (id: string) => void
}

export const useLibraryStore = create<
	LibraryStoreType & LibraryStoreActionsType
>()(
	persist(
		(set, getState) => ({
			...initialState,
			syncLibrary: async (syncWithCurrentDay) => {},
			getLibraryCatalog: () => ({
					readingBooks: getState().books.filter((b) => b.status === "reading"),
					finishedBooks: getState().books.filter((b) => b.status === "finished"),
					savedBooks: getState().books.filter((b) => b.status === "saved")
				}),
			toggleSave: (book) => {
				set((state) => {
					const isSaved = state.books.some((b) => b.id === book.id && b.status === "saved");
					return isSaved ? {
							books: state.books.filter((b) => b.id !== book.id),
							hot: {
								...state.hot,
								delete: state.hot.delete.concat(book.id)
							}
						} : {
							books: state.books.concat({ ...book, status: "saved" }),
							hot: {
								...state.hot,
								create: state.hot.create.concat({ id: book.id, status: "saved" })
							}
						};
				});
			},
			startReading: (book) => {
				set((state) => ({
					books: state.books.concat({ ...book, status: "reading" }),
					hot: {
						...state.hot,
						create: state.hot.create.concat({ id: book.id, status: "reading" })
					}
				}));
			},
			finishReading: (book) => {
				set((state) => ({
					books: state.books.concat({ ...book, status: "finished" }),
					hot: {
						...state.hot,
						create: state.hot.create.concat({ id: book.id, status: "finished" })
					}
				}));
			},
			isSaved: (id) => getState().books.some((b) => b.id === id && b.status === "saved"),
			removeFromLibrary: (id) => {
				set((state) => ({
					books: state.books.filter((b) => b.id !== id),
					hot: {
						...state.hot,
						delete: state.hot.delete.concat(id)
					}
				}));
			},
		}),
		{
			name: 'library-store',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)