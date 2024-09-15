import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
	const supabase = createServerComponentClient({ cookies });

	let { data: lists, error } = await supabase.from("lists").select("*");

	if (error) {
		return Response.json(error);
	}

	return Response.json(lists);
}

export async function POST(req: Request) {
	const { list_name } = await req.json();
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from("lists")
		.insert([{ name: list_name }])
		.select();
	if (error) {
		return Response.json(error);
	}

	return Response.json(data);
}

export async function PATCH(req: Request) {
	const { list_id, list_name } = await req.json();
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from("lists")
		.update([{ name: list_name }])
		.eq("id", list_id)

		.select();
	if (error) {
		return Response.json(error);
	}

	return Response.json(data);
}

export async function DELETE(req: Request) {
	const { list_id } = await req.json();
	const supabase = createServerComponentClient({ cookies });
	const { error } = await supabase.from("lists").delete().eq("id", list_id);

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
