import { v4 as uuid } from 'uuid';

export class Task {
  constructor({ id, description, status, subTasks, dueDate, priority, category, createdAt }){
    // add validation
    this.id = id || uuid();
    this.description = description;
    this.status = status;
    this.subTasks = subTasks || [];
    this.dueDate = dueDate || null;
    this.priority = priority || null;
    this.category = category || null;
    this.createdAt = createdAt || new Date().toISOString();
  }
}