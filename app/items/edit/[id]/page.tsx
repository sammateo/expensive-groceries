"use client";

import { Item } from "@/types/item";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const dynamic = "force-dynamic";
const revalidate = 0;
export default function Page({ params }: { params: { id: string } }) {
	const [item, setItem] = useState<Item>();
	const [categories, setCategories] = useState([]);

	const formRef = useRef<HTMLFormElement>(null);
	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		let item_name = formData.get("item_name");
		let item_category = formData.get("item_category");
		let item_cost: number = Number(formData.get("item_cost"));
		let cost_changed: boolean = item_cost != item?.cost;
		const response = await fetch("/api/item", {
			method: "PATCH",
			body: JSON.stringify({
				item_id: params.id,
				name: item_name,
				category_id: item_category,
				cost: item_cost,
				cost_changed: cost_changed,
			}),
		});
		if (response.ok) {
			//success
			toast.success("Item Updated Successfully");
			if (formRef.current) {
				formRef.current.reset();
			}
		} else {
			console.log(response);
			toast.error("Failed to update item");
		}
	};
	useEffect(() => {
		const item_response = fetch(`/api/item/single?item_id=${params.id}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setItem(data);
			});

		fetch("/api/category", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			});

		return () => {};
	}, []);

	return (
		<div className="mx-auto max-w-screen-lg px-4">
			{item && categories && (
				<form
					onSubmit={submitForm}
					action=""
					className="h-96 flex flex-col justify-center items-center"
				>
					<label htmlFor="item_name" className="px-2 block py-2">
						Name
					</label>
					<input
						name="item_name"
						type="text"
						defaultValue={item.name}
						className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
					/>
					<label htmlFor="item_category" className="px-2 block py-2">
						Category
					</label>
					<select
						name="item_category"
						required
						defaultValue={item.category_id}
						// defaultValue={item.category_id}
						// onChange={(e) => {
						// 	console.log(e.target.value);
						// 	console.log(item.category_id);
						// }}
						className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
					>
						{categories.map((category: any) => (
							<option
								key={category.id}
								value={category.id}
								selected={category.id == item.category_id}
							>
								{category.name}
							</option>
						))}
					</select>

					<label htmlFor="item_cost" className="px-2 block py-2">
						Cost
					</label>
					<input
						required
						name="item_cost"
						type="number"
						step=".01"
						defaultValue={item.cost}
						className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
					/>
					<button
						type="submit"
						className="border px-8 py-1 rounded-full my-4 block mx-auto"
					>
						Submit
					</button>
				</form>
			)}
		</div>
	);
}
