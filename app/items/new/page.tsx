"use client";
import Link from "next/link";
import React, { FormEvent, useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
import Bouncing from "@/components/Loader/Bouncing";
export default function page() {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		fetch("/api/category", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setCategories(data);
			});
	}, []);
	const formRef = useRef<HTMLFormElement>(null);
	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		let item_name = formData.get("item_name");
		let category_id = formData.get("item_category");
		let cost = formData.get("item_cost");
		const response = await fetch("/api/item", {
			method: "POST",
			body: JSON.stringify({
				item_name: item_name,
				category_id: category_id,
				cost: cost,
			}),
		});
		if (response.ok) {
			//success
			toast.success("Item Added Successfully");
			if (formRef.current) {
				formRef.current.reset();
			}
		} else {
			console.log(response);
			toast.error("Failed to add Item");
		}
	};

	return (
		<div className="mx-auto max-w-screen-sm px-10">
			<h1 className="w-fit mx-auto text-3xl my-2">New Item</h1>
			{(!categories || categories.length <= 0) && (
				<div className="flex justify-center items-center h-[75vh]">
					{/* <span>Loading...</span> */}
					<Bouncing />
				</div>
			)}
			{categories && categories.length > 0 && (
				<form
					onSubmit={submitForm}
					ref={formRef}
					className="h-96 flex flex-col justify-center items-center"
				>
					<label htmlFor="item_name" className="px-2 block py-2">
						Name
					</label>
					<input
						required
						name="item_name"
						type="text"
						className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
					/>
					<label htmlFor="item_category" className="px-2 block py-2">
						Category
					</label>
					<select
						name="item_category"
						required
						className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
					>
						{categories.map((category: any) => (
							<option key={category.id} value={category.id}>
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
			<div>
				<Link href="/items" className="flex items-center gap-x-2">
					<FaArrowLeftLong /> <span>Back To Items</span>
				</Link>
			</div>
		</div>
	);
}
