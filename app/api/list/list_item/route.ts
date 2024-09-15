import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = await request.nextUrl.searchParams;
	const list_id = searchParams.get("list_id");
	const supabase = createServerComponentClient({ cookies });

	let { data: list_items_view, error } = await supabase
		.from("list_items_view")
		.select("*")
		.eq("list_id", list_id);

	// let { data: list, error } = await supabase
	// 	.from("list_item")
	// 	.select("*")
	// 	.eq("list_id", list_id);
	if (error) {
		return Response.json(error);
	}

	return Response.json(list_items_view);
}

export async function POST(req: Request) {
	const { list_id, item_id, quantity, cost } = await req.json();
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from("list_item")
		.insert([{ item_id, list_id, quantity, cost }])
		.select();
	if (error) {
		return Response.json(error);
	}

	return Response.json(data);
}

export async function DELETE(req: Request) {
	const { list_item_id } = await req.json();
	const supabase = createServerComponentClient({ cookies });
	const { error } = await supabase
		.from("list_item")
		.delete()
		.eq("id", list_item_id);

	if (error) {
		console.log(error);
		return Response.json(error);
	}

	return Response.json({
		status: {
			ok: true,
		},
	});
}
