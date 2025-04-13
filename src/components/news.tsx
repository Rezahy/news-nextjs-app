import { Article } from "@/@types/news";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import NewsBookmarkButton from "./news-bookmark-button";
import Link from "next/link";

type NewsProps = {
	article: Article;
};
const News = ({ article }: NewsProps) => {
	return (
		<Card className="gap-2 pt-0 group h-full">
			<div className="rounded-t-xl mb-2 shadow overflow-hidden h-[200px] relative">
				<Image
					src={article.image}
					alt={article.title}
					width={500}
					height={500}
					className="h-full object-cover w-full group-hover:scale-115 transition-all duration-500"
				/>
				<NewsBookmarkButton article={article} />
			</div>
			<CardHeader>
				<CardDescription className="text-xs">
					<Badge variant="secondary">
						{new Date(article.publishedAt).toDateString()}
					</Badge>
				</CardDescription>
				<CardTitle className="text-lg group-hover:underline cursor-pointer">
					<Link href={article.url} target="_blank">
						{article.title}
					</Link>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex-1">
				<p className="line-clamp-3">{article.description}</p>
			</CardContent>
			<CardFooter className="text-xs">
				<p>Written by {article.source.name}</p>
			</CardFooter>
		</Card>
	);
};
export default News;
