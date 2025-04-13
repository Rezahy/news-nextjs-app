"use client"; // Error boundaries must be Client Components
import Header from "@/components/header";
import { Button } from "@/components/ui/button";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="px-7 py-7 sm:px-10 pb-10">
			<Header>{error.message}</Header>
			<Button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	);
}
