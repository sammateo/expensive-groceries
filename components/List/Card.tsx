"use client";
import Link from "next/link";
import React from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { RiExpandDiagonalLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Card({
	id,
	name,
	cost,
	list_items,
}: {
	id: string;
	name: string;
	cost: number;
	list_items: [
		{
			id: string;
			name: string;
			cost: number;
		}
	];
}) {
	return (
		<div
			key={id}
			className="shadow-md mx-auto py-4 px-4 rounded flex justify-between items-center w-full"
		>
			<div>
				<p className="text-lg">{name}</p>
				<div className="flex items-center text-sm gap-2">
					<p>${cost}</p>
					<p>|</p>
					<p>{list_items.length}</p>
				</div>
			</div>
			<div className="flex items-center gap-x-2">
				{/* <Link href={`/items/view/${id}`}>
					<RiExpandDiagonalLine className="text-xl cursor-pointer hover:text-green-600" />
				</Link> */}
				<Link href={`/lists/edit/${id}`}>
					<MdEdit className="text-xl cursor-pointer hover:text-blue-600" />
				</Link>
				<MdDeleteOutline
					className=" text-2xl cursor-pointer hover:text-red-500"
					onClick={async () => {
						if (
							confirm(
								"Are you sure you want to delete this item?"
							)
						) {
							// const response = await fetch("/api/list", {
							// 	method: "DELETE",
							// 	body: JSON.stringify({
							// 		list_id: id,
							// 	}),
							// });
							// if (response.ok) {
							// 	toast.success("List successfully deleted.");
							// 	window.location.reload();
							// }
						}
					}}
				/>
			</div>
		</div>
	);
}
