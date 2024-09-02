"use client";
import Link from "next/link";
import React, { FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import { FaArrowLeftLong } from "react-icons/fa6";
export default function page() {
	const formRef = useRef<HTMLFormElement>(null);
	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		let category_name = formData.get("category_name");
		const response = await fetch("/api/category", {
			method: "POST",
			body: JSON.stringify({ category_name: category_name }),
		});
		if (response.ok) {
			//success
			toast.success("Category Added Successfully");
			if (formRef.current) {
				formRef.current.reset();
			}
		} else {
			console.log(response);
			toast.error("Failed to add category");
		}
	};

	return (
		<div className="mx-auto max-w-screen-sm px-10">
			<h1 className="w-fit mx-auto text-3xl my-2">New Category</h1>
			<form
				onSubmit={submitForm}
				ref={formRef}
				className="h-96 flex flex-col justify-center items-center"
			>
				<label htmlFor="category_name" className="px-2 block py-2">
					Name
				</label>
				<input
					name="category_name"
					type="text"
					className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
				/>
				<button
					type="submit"
					className="border px-8 py-1 rounded-full my-4 block mx-auto"
				>
					Submit
				</button>
			</form>
			<div>
				<Link href="/categories" className="flex items-center gap-x-2">
					<FaArrowLeftLong /> <span>Back To Categories</span>
				</Link>
			</div>
		</div>
	);
}
