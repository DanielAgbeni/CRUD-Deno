// app.ts
import { Application } from 'https://deno.land/x/oak@v12.5.0/mod.ts';
import router from './routes.ts';

const app = new Application();

// Use the router
app.use(router.routes());
app.use(router.allowedMethods());

console.log('Server is running on http://localhost:8000');
await app.listen({ port: 8000 });
