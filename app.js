import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import router from './routes/toDoRoutes.js';

const app = new Koa();
app.use(bodyParser());

app
  .use(cors({ origin: 'http://localhost:5173' })) // only for local testing
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
