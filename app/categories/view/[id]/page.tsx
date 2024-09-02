import Card from "@/components/GroceryItem/Card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient({ cookies });
	const { data: category } = await supabase
		.from("category")
		.select("*")
		.eq("id", params.id)
		.single();
	const { data: items } = await supabase
		.from("item")
		.select("*")
		.eq("category_id", params.id);

	return (
		<div className="mx-auto max-w-screen-lg px-4">
			{category && (
				<div>
					<h1 className="w-fit mx-auto text-3xl my-2">
						{category.name}
					</h1>
					<div>
						<h2 className="w-fit text-xl my-2">Items:</h2>
						<div>
							{items &&
								items.map((item) => (
									<Card
										key={item.id}
										id={item.id}
										name={item.name}
										cost={item.cost}
										category={category}
									/>
								))}
						</div>
					</div>
				</div>
			)}

			{!category && (
				<div className="mx-auto w-fit h-[75vh] flex flex-col justify-center items-center gap-5">
					<h1 className="text-2xl">Category not found</h1>
					<Link href="/categories">
						<span>{"<-"}</span> Back to Categories
					</Link>
				</div>
			)}
		</div>
	);
}
