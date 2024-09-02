import { Item } from "@/types/item";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function POST(req: Request) {
	const { item_name, category_id, cost } = await req.json();
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from("item")
		.insert([{ name: item_name, category_id: category_id, cost: cost }])
		.select()
		.single();
	if (error) {
		return Response.json(error);
	}
	const { data: cost_data, error: cost_error } = await supabase
		.from("item_costs")
		.insert([{ item_id: data?.id, cost: cost }])
		.select();

	return Response.json(data);
}

export async function PATCH(req: Request) {
	const { item_id, name, category_id, cost, cost_changed } = await req.json();
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase
		.from("item")
		.update([{ name: name, category_id: category_id, cost: cost }])
		.eq("id", item_id)

		.select();

	if (error) {
		return Response.json(error);
	}
	if (cost_changed) {
		const { data: cost_data, error: cost_error } = await supabase
			.from("item_costs")
			.insert([{ item_id: item_id, cost: cost }])
			.select();
	}

	return Response.json(data);
}

export async function DELETE(req: Request) {
	const { item_id } = await req.json();
	const supabase = createServerComponentClient({ cookies });
	const { error } = await supabase.from("item").delete().eq("id", item_id);

	if (error) {
		return Response.json(error);
	}

	return Response.json({
		status: {
			ok: true,
		},
	});
}
