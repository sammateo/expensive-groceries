"use client";
import { ListItem } from "@/types/item";
import Link from "next/link";
import React from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Card({ list_item }: { list_item: ListItem }) {
	return (
		<div
			key={list_item.id}
			className="shadow-md mx-auto py-4 px-4 rounded flex justify-between items-center w-full"
		>
			<div>
				<p className="text-lg">{list_item.item_name}</p>
				<div className="flex items-center text-sm gap-2">
					<p>${list_item.cost}</p>
					<p>x</p>
					<p>{list_item.quantity} items</p>
					<p>|</p>
					<p>
						$
						{(
							Number(list_item.quantity) * Number(list_item.cost)
						).toFixed(2)}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-x-2">
				{/* <Link href={`/lists/view/${id}`}>
					<RiExpandDiagonalLine className="text-xl cursor-pointer hover:text-green-600" />
				</Link> */}
				{/* <Link href={`/lists/edit/${id}`}>
					<MdEdit className="text-xl cursor-pointer hover:text-blue-600" />
				</Link> */}
				<MdDeleteOutline
					className=" text-2xl cursor-pointer hover:text-red-500"
					onClick={async () => {
						if (
							confirm(
								"Are you sure you want to delete this item?"
							)
						) {
							console.log(list_item);
							const response = await fetch(
								"/api/list/list_item",
								{
									method: "DELETE",
									body: JSON.stringify({
										list_item_id: list_item.id,
									}),
								}
							);
							if (response.ok) {
								toast.success("List successfully deleted.");
								window.location.reload();
							}
						}
					}}
				/>
			</div>
		</div>
	);
}
