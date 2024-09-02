import Link from "next/link";
import React from "react";

export default function Navbar() {
	let links = [
		{
			name: "Categories",
			path: "/categories",
		},
		{
			name: "Items",
			path: "/items",
		},
		{
			name: "Lists",
			path: "/lists",
		},
	];
	return (
		<div className="flex justify-center gap-5 py-5 px-5 flex-wrap">
			{links.map((link) => (
				<Link href={link.path} key={link.path}>
					{link.name}
				</Link>
			))}
		</div>
	);
}
