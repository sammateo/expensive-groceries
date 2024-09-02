import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
	"https://xyzcompany.supabase.co",
	"public-anon-key"
);

export default function Home() {
	return (
		<div className="">
			<h1 className=" w-fit mx-auto text-3xl my-2">
				Expensive Grocery Tracker
			</h1>
			<div></div>
		</div>
	);
}
