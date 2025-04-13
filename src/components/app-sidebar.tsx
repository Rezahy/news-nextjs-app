"use client";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import { Bookmark, Search } from "lucide-react";
import { FormEvent, useRef } from "react";
import { newsCategories } from "@/lib/category";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export function AppSidebar() {
	const router = useRouter();
	const { isMobile, setOpenMobile } = useSidebar();
	const pathname = usePathname();
	const searchRef = useRef<HTMLInputElement | null>(null);
	const onSubmitHandler = (e: FormEvent) => {
		e.preventDefault();
		if (searchRef.current && searchRef.current.value.trim().length > 0) {
			const { value } = searchRef.current;
			router.push(`/search/${decodeURI(value)}`);
			sidebarMenuButtonClickHandler();
		}
	};
	const sidebarMenuButtonClickHandler = () => {
		if (isMobile) {
			setOpenMobile(false);
		}
	};
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="relative mt-2 group-data-[collapsible=icon]:hidden">
				<form onSubmit={onSubmitHandler}>
					<Input
						placeholder="Search news ..."
						className="pr-9"
						ref={searchRef}
						autoFocus={false}
						tabIndex={-1}
					/>
					<Button
						variant="ghost"
						size="sm"
						className="absolute right-2 text-gray-500 top-[50%] -translate-y-[50%]"
					>
						<Search absoluteStrokeWidth size={16} />
					</Button>
				</form>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Bookmarked news</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={pathname === "/bookmark"}
									onClick={sidebarMenuButtonClickHandler}
									tooltip="Bookmarked"
								>
									<Link href="/bookmark">
										<Bookmark className="fill-primary text-primary" />
										<span>Bookmarked</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>News categories</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{newsCategories.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										isActive={pathname === item.href}
										onClick={sidebarMenuButtonClickHandler}
										tooltip={item.title}
									>
										<Link href={item.href}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
