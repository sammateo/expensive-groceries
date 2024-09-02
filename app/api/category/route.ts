import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
	const supabase = createServerComponentClient({ cookies });

	let { data: category, error } = await supabase.from("category").select("*");

	if (error) {
		return Response.json(error);
	}

	return Response.json(category);
}

export async function POST(req: Request) {
	const { category_name } = await req.json();
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from("category")
		.insert([{ name: category_name }])
		.select();
	if (error) {
		return Response.json(error);
	}

	return Response.json(data);
}

export async function PATCH(req: Request) {
	const { category_id, category_name } = await req.json();
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from("category")
		.update([{ name: category_name }])
		.eq("id", category_id)

		.select();
	if (error) {
		return Response.json(error);
	}

	return Response.json(data);
}

export async function DELETE(req: Request) {
	const { category_id } = await req.json();
	const supabase = createServerComponentClient({ cookies });
	const { error } = await supabase
		.from("category")
		.delete()
		.eq("id", category_id);

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
