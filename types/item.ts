export interface Item {
	id: string;
	name: string;
	created_at: Date;
	category_id: string;
	cost: number;
}
export interface ListItem {
	id: string;
	item_name: string;
	list_name: string;
	created_at: Date;
	// category_id: string;
	cost: number;
	quantity: number;
}
