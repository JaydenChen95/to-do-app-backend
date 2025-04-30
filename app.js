import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import router from './routes/toDoRoutes.js';

const app = new Koa();
app.use(bodyParser());

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
