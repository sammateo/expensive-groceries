"use client";
import Card from "@/components/ListItem/Card";
import { List } from "@/types/category";
import { Item, ListItem } from "@/types/item";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Page({ params }: { params: { id: string } }) {
	// const supabase = createServerComponentClient({ cookies });
	const [list, setList] = useState<List>();
	const [loading, setLoading] = useState(true);
	const [showAddItemPopup, setshowAddItemPopup] = useState(false);
	const [items, setItems] = useState<Item[]>();
	const [listItems, setListItems] = useState<ListItem[]>();

	const fetchListItems = () => {
		fetch(`/api/list/list_item?list_id=${params.id}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setListItems(data);
			});
	};

	useEffect(() => {
		const category_response = fetch(
			`/api/list/single?list_id=${params.id}`,
			{
				method: "GET",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setList(data);
				setLoading(false);
			});

		fetch("/api/item", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				setItems(data);
			});

		fetchListItems();

		return () => {};
	}, []);

	const getTotal = () => {
		let sum = 0;
		listItems?.forEach((list_item) => {
			sum += list_item.cost * list_item.quantity;
		});
		return sum.toFixed(2);
	};
	return (
		<div className="mx-auto max-w-screen-lg px-4">
			{list && list.id && (
				<div>
					<h1 className="w-fit mx-auto text-3xl my-2">{list.name}</h1>
					<p className=" border-t-2">${getTotal()}</p>
					<div>
						<div className="flex items-center justify-between">
							<h2 className="w-fit text-xl my-2">Items:</h2>
							<p
								// href={"/lists/new"}
								onClick={() => {
									setshowAddItemPopup(true);
								}}
								className="border-2 px-4 py-1 cursor-pointer rounded-full hover:bg-slate-600 hover:text-white"
							>
								Add Item To List
							</p>
						</div>
						<div>
							{listItems &&
								listItems.map((list_item) => (
									<Card
										key={list_item.id}
										list_item={list_item}
									/>
									// <div key={list_item.id}>
									// 	<p>{list_item.item_name}</p>
									// </div>
									// <Card
									// 	key={item.id}
									// 	id={item.id}
									// 	name={item.name}
									// 	cost={item.cost}
									// 	category={""}
									// />
								))}
						</div>

						{showAddItemPopup && items && (
							<AddItemToListPopup
								items={items}
								setshowAddItemPopup={setshowAddItemPopup}
								list_id={params.id}
								fetchListItems={fetchListItems}
							/>
						)}
					</div>
				</div>
			)}
			{loading && (
				<div className="mx-auto w-fit h-[75vh] flex flex-col justify-center items-center gap-5">
					<h1 className="text-2xl">Loading</h1>
					{/* <Link href="/categories">
						<span>{"<-"}</span> Back to Categories
					</Link> */}
				</div>
			)}
			{(!list || !list.id) && !loading && (
				<div className="mx-auto w-fit h-[75vh] flex flex-col justify-center items-center gap-5">
					<h1 className="text-2xl">List not found</h1>
					<Link href="/categories">
						<span>{"<-"}</span> Back to Categories
					</Link>
				</div>
			)}
		</div>
	);
}

const AddItemToListPopup = ({
	items,
	setshowAddItemPopup,
	fetchListItems,
	list_id,
}: {
	items: Item[];
	setshowAddItemPopup: any;
	fetchListItems: any;
	list_id: string;
}) => {
	const submitForm = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		let item_id = formData.get("item_name");
		let item_cost = formData.get("item_cost");
		let item_quantity = formData.get("item_quantity");
		console.log(item_cost);
		const response = await fetch("/api/list/list_item", {
			method: "POST",
			body: JSON.stringify({
				list_id,
				item_id: item_id,
				cost: item_cost,
				quantity: item_quantity,
			}),
		});
		if (response.ok) {
			//success
			toast.success("List Updated Successfully");
			if (formRef.current) {
				formRef.current.reset();
			}
			setshowAddItemPopup(false);
			fetchListItems();
		} else {
			console.log(response);
			toast.error("Failed to update list");
		}
	};
	const formRef = useRef<HTMLFormElement>(null);
	const [currentItem, setCurrentItem] = useState<Item>(items && items[0]);

	return (
		<div
			className="rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-96"
			role="alert"
		>
			<div className="flex items-center gap-4">
				<span className="shrink-0 rounded-full bg-blue-400 p-2 text-white">
					<svg
						className="size-4"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
							fillRule="evenodd"
						/>
					</svg>
				</span>

				<p className="font-medium sm:text-lg">Add Item!</p>
			</div>

			<form
				onSubmit={submitForm}
				ref={formRef}
				className="flex flex-col justify-center items-center"
			>
				<label htmlFor="item_name" className="px-2 block py-2">
					Item
				</label>
				<select
					name="item_name"
					required
					onChange={(e) => {
						console.log(e.target.value);
						if (items) {
							setCurrentItem(
								items.find((i) => i.id === e.target.value)!
							);
						}
					}}
					className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
				>
					{items.map((item: Item) => (
						<option key={item.id} value={item.id}>
							{item.name}
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
					// disabled
					readOnly={true}
					value={currentItem?.cost}
					className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
				/>
				<label htmlFor="item_quantity" className="px-2 block py-2">
					Quantity
				</label>
				<input
					required
					name="item_quantity"
					type="number"
					step="1"
					className="border-2 w-full py-1 px-2 outline-none transition-all duration-300 rounded-full focus:border-slate-600 hover:border-slate-600"
				/>
				<button
					type="submit"
					className="border px-8 py-1 rounded-full my-4 block mx-auto"
				>
					Submit
				</button>
				<button
					className="border px-8 py-1 rounded-full my-4 block mx-auto"
					onClick={() => {
						setshowAddItemPopup(false);
					}}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};
