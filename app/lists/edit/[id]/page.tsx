"use client";

import { List } from "@/types/category";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { id: string } }) {
	const [list, setList] = useState<List>();
	const formRef = useRef<HTMLFormElement>(null);
	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		let list_name = formData.get("list_name");
		const response = await fetch("/api/list", {
			method: "PATCH",
			body: JSON.stringify({
				list_id: params.id,
				list_name: list_name,
			}),
		});
		if (response.ok) {
			//success
			toast.success("List Updated Successfully");
			if (formRef.current) {
				formRef.current.reset();
			}
		} else {
			console.log(response);
			toast.error("Failed to update list");
		}
	};
	useEffect(() => {
		const list_response = fetch(`/api/list/single?list_id=${params.id}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setList(data);
			});

		return () => {};
	}, []);

	return (
		<div className="mx-auto max-w-screen-lg px-4">
			{list && (
				<form
					onSubmit={submitForm}
					action=""
					className="h-96 flex flex-col justify-center items-center"
				>
					<label htmlFor="list_name" className="px-2 block py-2">
						Name
					</label>
					<input
						name="list_name"
						type="text"
						defaultValue={list.name}
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
