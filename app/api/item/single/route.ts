import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = await request.nextUrl.searchParams;
	const item_id = searchParams.get("item_id");
	const supabase = createServerComponentClient({ cookies });

	let { data: category, error } = await supabase
		.from("item")
		.select("*")
		.eq("id", item_id)
		.single();
	if (error) {
		return Response.json(error);
	}

	return Response.json(category);
}
