import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Card from "@/components/Category/Card";
export default async function page() {
	const supabase = createServerComponentClient({ cookies });
	const { data: categories } = await supabase.from("category").select();
	return (
		<div className="mx-auto max-w-screen-lg px-4">
			<h1 className="w-fit mx-auto text-3xl my-2">Categories</h1>
			<div className="flex justify-end my-4">
				<Link
					href={"/categories/new"}
					className="border-2 px-4 py-1 rounded-full hover:bg-slate-600 hover:text-white"
				>
					New Category
				</Link>
			</div>
			<div className="flex flex-col gap-4">
				{categories &&
					categories.map((category) => (
						<Card
							id={category.id}
							name={category.name}
							key={category.id}
						/>
					))}
			</div>
		</div>
	);
}
