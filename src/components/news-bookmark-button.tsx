"use client";
import { Bookmark, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Article } from "@/@types/news";
import { useNewsStore } from "@/providers/news-store-provider";
import { useTransition } from "react";
import { wait } from "@/lib/wait";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type NewsBookmarkButtonProps = {
	article: Article;
};
const NewsBookmarkButton = ({ article }: NewsBookmarkButtonProps) => {
	const isBookmarked = useNewsStore((state) => state.isBookmarked);
	const bookmarkNews = useNewsStore((state) => state.bookmarkNews);
	const unBookmarkNews = useNewsStore((state) => state.unBookmarkNews);
	const [isPending, startTransition] = useTransition();

	const newsButtonTriggerHandler = () => {
		startTransition(async () => {
			await wait(3000);
			if (isBookmarked(article)) {
				unBookmarkNews(article);
				toast.success("news un bookmarked successfully");
			} else {
				bookmarkNews(article);
				toast.success("news  bookmarked successfully");
			}
		});
	};
	return (
		<Button
			className="xl:scale-0 xl:opacity-0 cursor-pointer absolute top-2 right-2  dark:bg-black/50  dark:hover:bg-black/75 group-hover:scale-100 group-hover:opacity-100 duration-300"
			variant="outline"
			size="icon"
			disabled={isPending}
			onClick={newsButtonTriggerHandler}
		>
			{isPending ? (
				<Loader className="animate-spin" />
			) : (
				<Bookmark
					className={cn("h-4 w-4", {
						"fill-primary text-primary": isBookmarked(article),
					})}
				/>
			)}
		</Button>
	);
};
export default NewsBookmarkButton;
