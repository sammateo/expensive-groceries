import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Card from "@/components/GroceryItem/Card";
export default async function page() {
	const supabase = createServerComponentClient({ cookies });
	const { data: items } = await supabase.from("item").select();
	const { data: categories } = await supabase.from("category").select();

	return (
		<div className="mx-auto max-w-screen-lg px-4">
			<h1 className="w-fit mx-auto text-3xl my-2">Items</h1>
			<div className="flex justify-end my-4">
				<Link
					href={"/items/new"}
					className="border-2 px-4 py-1 rounded-full hover:bg-slate-600 hover:text-white"
				>
					New Item
				</Link>
			</div>
			<div className="flex flex-col gap-4">
				{items &&
					items.map((item) => {
						const category = categories?.find(
							(x) => x.id == item.category_id
						);
						return (
							<Card
								id={item.id}
								name={item.name}
								cost={item.cost}
								key={item.id}
								category={category}
							/>
						);
					})}
			</div>
		</div>
	);
}
