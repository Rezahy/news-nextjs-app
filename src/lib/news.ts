export const NEWS_BASE_URL = process.env.NEWS_BASE_URL as string;
export const NEWS_API_PARAMS = new URLSearchParams({
	apikey: process.env.NEWS_API_KEY as string,
	lang: "en",
});
