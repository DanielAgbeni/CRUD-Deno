// data.ts
export interface Book {
	id: string;
	title: string;
	author: string;
	pages: number;
}

const DATA_FILE = './books.json';

// Helper function to read data from JSON file
export async function readBooks(): Promise<Book[]> {
	const data = await Deno.readTextFile(DATA_FILE);
	return JSON.parse(data);
}

// Helper function to write data to JSON file
export async function writeBooks(books: Book[]): Promise<void> {
	await Deno.writeTextFile(DATA_FILE, JSON.stringify(books, null, 2));
}
