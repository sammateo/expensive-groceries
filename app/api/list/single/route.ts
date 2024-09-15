import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = await request.nextUrl.searchParams;
	const list_id = searchParams.get("list_id");
	const supabase = createServerComponentClient({ cookies });

	let { data: list, error } = await supabase
		.from("lists")
		.select("*")
		.eq("id", list_id)
		.single();
	if (error) {
		return Response.json(error);
	}

	return Response.json(list);
}
