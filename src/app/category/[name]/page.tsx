import { Category } from "@/@types/category";
import { searchNewsByCategory } from "@/actions/news-action";
import LoadingPage from "@/app/loading";
import Header from "@/components/header";
import NewsList from "@/components/news-list";
import { Suspense } from "react";

const CategoryPage = async ({
	params,
}: {
	params: Promise<{ name: string }>;
}) => {
	const { name } = await params;

	return (
		<div className="px-7 py-7 sm:px-10 pb-10 ">
			<Header>Top news in {name}</Header>

			<Suspense fallback={<LoadingPage />}>
				<SuspenseWrapper name={name} />
			</Suspense>
		</div>
	);
};
export default CategoryPage;

const SuspenseWrapper = async ({ name }: { name: string }) => {
	const newsData = await searchNewsByCategory(name as Category);
	return <NewsList articles={newsData.articles} />;
};
