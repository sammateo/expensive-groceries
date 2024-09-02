import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = await request.nextUrl.searchParams;
	const category_id = searchParams.get("category_id");
	const supabase = createServerComponentClient({ cookies });

	let { data: category, error } = await supabase
		.from("category")
		.select("*")
		.eq("id", category_id)
		.single();
	if (error) {
		return Response.json(error);
	}

	return Response.json(category);
}
