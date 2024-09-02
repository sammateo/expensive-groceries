"use client";

import { Category } from "@/types/category";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { id: string } }) {
	const [category, setCategory] = useState<Category>();
	const formRef = useRef<HTMLFormElement>(null);
	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		let category_name = formData.get("category_name");
		const response = await fetch("/api/category", {
			method: "PATCH",
			body: JSON.stringify({
				category_id: params.id,
				category_name: category_name,
			}),
		});
		if (response.ok) {
			//success
			toast.success("Category Updated Successfully");
			if (formRef.current) {
				formRef.current.reset();
			}
		} else {
			console.log(response);
			toast.error("Failed to update category");
		}
	};
	useEffect(() => {
		const category_response = fetch(
			`/api/category/single?category_id=${params.id}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setCategory(data);
			});

		return () => {};
	}, []);

	return (
		<div className="mx-auto max-w-screen-lg px-4">
			{category && (
				<form
					onSubmit={submitForm}
					action=""
					className="h-96 flex flex-col justify-center items-center"
				>
					<label htmlFor="category_name" className="px-2 block py-2">
						Name
					</label>
					<input
						name="category_name"
						type="text"
						defaultValue={category.name}
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
