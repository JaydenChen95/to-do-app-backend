import { 
  PutCommand,
  UpdateCommand,
  QueryCommand,
  ScanCommand, 
} from '@aws-sdk/lib-dynamodb';
import { getDocumentClient } from '../clients/dynamoClient.js';
import { Task } from '../models/task.js';

const client = getDocumentClient();

export const putRecord = async (task) => {
  const item = mapToDynamo(task);

  try {
    await client.send(new PutCommand({
      TableName: 'Tasks',
      Item: item,
    }));
    
    return mapToDomainModel(item);
  } catch (e) {
    throw new Error(e);
  }
};

export const updateRecord = async (id, status) => {
  try {
    const response = await client.send(new UpdateCommand({
      TableName: 'Tasks',
      Key: {
        Id: id,
      },
      UpdateExpression: 'SET #status = :status',
      ExpressionAttributeNames: {
        '#status': 'Status', // alias the reserved word
      },
      ExpressionAttributeValues: {
        ':status': status,
      },
      ReturnValues: 'ALL_NEW',
    }));

    return mapToDomainModel(response.Attributes);
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllRecords = async () => {
  try {
    const response = await client.send(new ScanCommand({
      TableName: 'Tasks',
    }));
    console.log(response)
    const items = response.Items.map(item => mapToDomainModel(item));
    return items;
  } catch (e) {
    throw new Error(e);
  }
};

export const getRecordById = async (id) => {
  try {
    const response = await client.send(new QueryCommand({
      TableName: 'Tasks',
      KeyConditionExpression: 'Id = :id',
      ExpressionAttributeValues: {
        ':id': { S: id },
      },
    }));

    return response.Items.map(item => mapToDomainModel(item));
  } catch (e) {
    throw new Error(e);
  }
};

const mapToDynamo = (task) => {
  return {
    Id: task.id,
    Description: task.description,
    Status: task.status,
    SubTasks: task.subTasks.map(subTask => {
      return {
        Description: subTask.description,
        DueDate: subTask.dueDate,
        Priority: subTask.priority,
        Status: subTask.status,
      };
    }),
    DueDate: task.dueDate,
    Priority: task.priority,
    Category: task.category,
    CreatedAt: task.createdAt,
  };
};

const mapToDomainModel = (dynamoModel) => {
  const subTasks = dynamoModel.SubTasks.map(subTask => {
    return {
      description: subTask.Description,
      dueDate: subTask.DueDate,
      priority: subTask.Priority,
      status: subTask.Status,
    };
  });
  return new Task({
    id: dynamoModel.Id,
    description: dynamoModel.Description,
    status: dynamoModel.Status,
    subTasks: subTasks,
    dueDate: dynamoModel.DueDate,
    priority: dynamoModel.Priority,
    category: dynamoModel.Category,
    createdAt: dynamoModel.CreatedAt,
  });
};