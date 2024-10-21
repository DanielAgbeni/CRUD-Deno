// routes.ts
import { Router } from 'https://deno.land/x/oak@v12.5.0/mod.ts';
import { Book, readBooks, writeBooks } from './data.ts';

const router = new Router();

// Create a new book
router.post('/books', async (ctx) => {
	const { title, author, pages } = await ctx.request.body({ type: 'json' })
		.value;
	const id = crypto.randomUUID();
	const newBook: Book = { id, title, author, pages };

	const books = await readBooks();
	books.push(newBook);
	await writeBooks(books);

	ctx.response.status = 201;
	ctx.response.body = { message: 'Book added', book: newBook };
});

// Get all books
router.get('/books', async (ctx) => {
	const books = await readBooks();
	ctx.response.body = { books };
});

// Update a book by ID
router.put('/books/:id', async (ctx) => {
	const id = ctx.params.id;
	const { title, author, pages } = await ctx.request.body({ type: 'json' })
		.value;

	const books = await readBooks();
	const book = books.find((b) => b.id === id);

	if (book) {
		book.title = title;
		book.author = author;
		book.pages = pages;
		await writeBooks(books);

		ctx.response.body = { message: 'Book updated', book };
	} else {
		ctx.response.status = 404;
		ctx.response.body = { message: 'Book not found' };
	}
});

// Delete a book by ID
router.delete('/books/:id', async (ctx) => {
	const id = ctx.params.id;
	const books = await readBooks();
	const newBooks = books.filter((b) => b.id !== id);

	if (newBooks.length !== books.length) {
		await writeBooks(newBooks);
		ctx.response.body = { message: 'Book deleted' };
	} else {
		ctx.response.status = 404;
		ctx.response.body = { message: 'Book not found' };
	}
});

export default router;
