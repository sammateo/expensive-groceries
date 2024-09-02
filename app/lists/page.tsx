import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Card from "@/components/List/Card";
export default async function page() {
	const supabase = createServerComponentClient({ cookies });
	const { data: lists } = await supabase.from("lists").select();
	const { data: items } = await supabase.from("item").select();

	return (
		<div className="mx-auto max-w-screen-lg px-4">
			<h1 className="w-fit mx-auto text-3xl my-2">Lists</h1>
			<div className="flex justify-end my-4">
				<Link
					href={"/lists/new"}
					className="border-2 px-4 py-1 rounded-full hover:bg-slate-600 hover:text-white"
				>
					New List
				</Link>
			</div>
			<div className="flex flex-col gap-4">
				{lists &&
					lists.map((list) => {
						// const itemCount = items(
						// 	(x) => x. == list.id
						// );
						return (
							// <Card
							// 	id={item.id}
							// 	name={item.name}
							// 	cost={item.cost}
							// 	key={item.id}
							// 	// category={itemCount}
							// />
							<div key={list.id}></div>
						);
					})}
			</div>
		</div>
	);
}
