import { searchNews } from "@/actions/news-action";
import Loading from "@/app/loading";
import EmptyView from "@/components/empty-view";
import Header from "@/components/header";
import NewsList from "@/components/news-list";
import { Suspense } from "react";

const SearchPage = async ({
	params,
}: {
	params: Promise<{ query: string }>;
}) => {
	const { query } = await params;
	return (
		<div className="sm:px-10 px-7 py-5 pb-10 ">
			<Header>Top news in {query} search keyword</Header>
			<Suspense fallback={<Loading />}>
				<SuspenseWrapper query={query} />
			</Suspense>
		</div>
	);
};
export default SearchPage;

const SuspenseWrapper = async ({ query }: { query: string }) => {
	const newsData = await searchNews(query);
	return newsData.articles.length > 0 ? (
		<NewsList articles={newsData.articles} />
	) : (
		<EmptyView>We can&apos;t find anything with {query} keyword</EmptyView>
	);
};
