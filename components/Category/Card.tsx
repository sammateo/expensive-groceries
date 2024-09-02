"use client";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { RiExpandDiagonalLine } from "react-icons/ri";
import Link from "next/link";
export default function Card({ id, name }: { id: string; name: string }) {
	return (
		<div
			key={id}
			className="shadow-md mx-auto py-4 px-4 rounded flex justify-between items-center w-full"
		>
			<p className="text-lg">{name}</p>
			<div className="flex items-center gap-x-2">
				<Link href={`/categories/view/${id}`}>
					<RiExpandDiagonalLine className="text-xl cursor-pointer hover:text-green-600" />
				</Link>
				<Link href={`/categories/edit/${id}`}>
					<MdEdit className="text-xl cursor-pointer hover:text-blue-600" />
				</Link>
				<MdDeleteOutline
					className=" text-2xl cursor-pointer hover:text-red-500"
					onClick={async () => {
						if (
							confirm(
								"Deleting this category will also delete associated items."
							)
						) {
							const response = await fetch("/api/category", {
								method: "DELETE",
								body: JSON.stringify({
									category_id: id,
								}),
							});
							if (response.ok) {
								toast.success("Category successfully deleted.");
								window.location.reload();
							}
						}
					}}
				/>
			</div>
		</div>
	);
}
