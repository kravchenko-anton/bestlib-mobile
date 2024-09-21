import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ReactionType  {
	id: string
	type: string
	text: string
	xpath: string
	startOffset: number
	endOffset: number
	book: {
		id: string
		title: string
		author: string
		picture: string
	}
}
export interface ReactionStoreType {
	reactions: ReactionType[]
	hot: {
		create: ReactionType[],
		update: ReactionType[],
		delete: ReactionType[]
	}
}
const initialState: ReactionStoreType = {
	reactions: [],
	hot: {
		create: [],
		update: [],
		delete: []
	}
}

export interface ReactionStoreActionsType {
	createReaction: (reaction: ReactionType) => void
	findReactionById: (id: string) => Promise<ReactionType | undefined>
	updateReaction: (id: string,reaction: Partial<Omit<ReactionType, "id">>) => void
	deleteReaction: (id:string) => void
}
export const useReactionStore = create<
	ReactionStoreType & ReactionStoreActionsType
>()(
	persist(
		(set,getState) => ({
			...initialState,
			findReactionById: async id => {
				return getState().reactions.find(r => r.id === id)
			},
			createReaction: reaction => {
				set(state => ({
					...state,
				hot: {
					...state.hot,
					create: [...state.hot.create, reaction]
				}
				}))
				set(state => ({
					...state,
					reactions: [...state.reactions, reaction],
				}))
			},
			updateReaction: (id, updateObject) => {
				set(state => {
				// if exists in create, update it, but only partial fields
				if (state.hot.create.find(r => r.id === id)) {
					return {
						...state,
						hot: {
							...state.hot,
							create: state.hot.create.map(r => (r.id === id ? { ...r, ...updateObject } : r))
						}
					}
				}
					return {
						...state,
						reactions: state.reactions.map(r => (r.id === id ? { ...r, ...updateObject } : r))
					}})
			},
			deleteReaction: id => {
				set(state => {
						// if reaction is in create, remove it from create
					if (state.hot.create.find(r => r.id === id)) {
						return {
							...state,
							hot: {
								...state.hot,
								create: state.hot.create.filter(r => r.id !== id)
							}
						}
					}
					return {
						...state,
						reactions: state.reactions.filter(r => r.id !== id)
					}
				})
			}
		}),
		{
			name: 'reaction-store',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
