import NewsList from "@/components/news-list";
import { searchNews } from "@/actions/news-action";
import { Suspense } from "react";
import Loading from "./loading";
import Header from "@/components/header";

const HomePage = () => {
	return (
		<div className="px-7 py-7 sm:px-10 pb-10">
			{<Header>Top news in USA</Header>}
			<Suspense fallback={<Loading />}>
				<SuspenseWrapper />
			</Suspense>
		</div>
	);
};
export default HomePage;

const SuspenseWrapper = async () => {
	const newsData = await searchNews("usa");
	return <NewsList articles={newsData.articles} />;
};
