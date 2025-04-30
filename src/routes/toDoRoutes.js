import Router from '@koa/router';
import { Task } from '../models/Task.js';
import { getAllRecords, getRecordById, putRecord, updateRecord } from '../services/toDoServices.js';
import { validate, validateStatus } from '../validators/validate.js';

const router = new Router();

router.get('/to-do', async (ctx) => {
  const items = await getAllRecords();
  
  ctx.body = items;
});
  
router.get('/to-do/:id', async (ctx) => {
  const { id } = ctx.params;
  
  const items = await getRecordById(id);
    
  ctx.body = items;
});
  
router.post('/to-do', async (ctx) => {
  const isValid = validate(ctx.request.body);
  if(!isValid){
    ctx.body = 'Invalid request';
    ctx.status = 400;
    return;
  }
  const { description, status, subTasks, dueDate, priority, category } = ctx.request.body;
  
  const task = new Task({
    description,
    status,
    subTasks,
    dueDate,
    priority,
    category,
  });
  
  ctx.body = await putRecord(task);
  ctx.status = 200;
});
  
router.put('/to-do/:id', async (ctx) => {
  const { id } = ctx.params;

  const isValid = validate(ctx.request.body);
  if(!isValid){
    ctx.body = 'Invalid request';
    ctx.status = 400;
    return;
  }
  const { description, status, subTasks, dueDate, priority, category, createdAt } = ctx.request.body;
  
  const task = new Task({ 
    id,
    description,
    status,
    subTasks,
    dueDate,
    priority,
    category,
    createdAt,
  });
  
  ctx.body = await putRecord(task);
  ctx.status = 200;
});
  
router.patch('/to-do/:id', async (ctx) => {
  const { id } = ctx.params;
  const { status } = ctx.request.body;
  const validStatus = validateStatus(status);

  if(!validStatus){
    ctx.body = 'Invalid status';
    ctx.status = 400;
    return;
  }
    
  ctx.body = await updateRecord(id, status);
  ctx.status = 200;
});

export default router;