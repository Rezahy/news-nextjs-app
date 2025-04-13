"use server";
import { Category } from "@/@types/category";
import { NewsResponse } from "@/@types/news";
import { isCategory } from "@/lib/category";
import { NEWS_API_PARAMS, NEWS_BASE_URL } from "@/lib/news";

export const searchNews = async (query: string) => {
	const response = await fetch(
		`${NEWS_BASE_URL}/search?${NEWS_API_PARAMS}&q=${encodeURI(query)}`,
		{ next: { revalidate: 60 } }
	);
	if (!response.ok) {
		throw new Error("Something went wrong");
	}
	const data = await response.json();
	return data as NewsResponse;
};

export const searchNewsByCategory = async (category: Category) => {
	if (!isCategory(category)) {
		throw new Error(`There is't ${category} category on website`);
	}
	const response = await fetch(
		`${NEWS_BASE_URL}/top-headlines?${NEWS_API_PARAMS}&category=${category}`,
		{ next: { revalidate: 60 } }
	);
	if (!response.ok) {
		throw new Error("Something went wrong");
	}
	const data = await response.json();
	return data as NewsResponse;
};
