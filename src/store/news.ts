import { Article } from "@/@types/news";
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

type NewsState = {
	bookmarkedNewsList: Article[];
};

type NewsActions = {
	bookmarkNews: (news: Article) => void;
	unBookmarkNews: (news: Article) => void;
	isBookmarked: (news: Article) => boolean;
};

export type NewsStore = NewsState & NewsActions;

export const defaultInitialState: NewsState = {
	bookmarkedNewsList: [],
};

export const createNewsStore = (
	initialState: NewsState = defaultInitialState
) => {
	return createStore<NewsStore>()(
		persist(
			(set, get) => ({
				...initialState,
				bookmarkNews: (news: Article) => {
					set((state) => ({
						bookmarkedNewsList: [news, ...state.bookmarkedNewsList],
					}));
				},
				unBookmarkNews: (news: Article) => {
					set((state) => ({
						bookmarkedNewsList: state.bookmarkedNewsList.filter(
							(item) => item.url !== news.url
						),
					}));
				},
				isBookmarked: (news: Article) => {
					return get().bookmarkedNewsList.some((item) => item.url === news.url);
				},
			}),
			{ name: "@news-app:bookmarked-news-list-state-1.0.0", version: 1 }
		)
	);
};
