import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  putRecord,
  updateRecord,
  getAllRecords,
  getRecordById,
} from './toDoServices.js';

import { PutCommand, UpdateCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const mocks = vi.hoisted(() => ({ mockSend: vi.fn() }));

vi.mock('../models/task.js', () => ({
  Task: vi.fn((data) => data),
}));
  
vi.mock('../clients/dynamoClient.js', () => ({
  getDocumentClient: () => ({
    send: mocks.mockSend,
  }),
}));
  

beforeEach(() => {
  mocks.mockSend.mockReset();
});

const mockTask = {
  id: '1',
  description: 'Test task',
  status: 'Pending',
  subTasks: [
    {
      description: 'Sub 1',
      dueDate: '2025-01-01',
      priority: 1,
      status: 'Pending',
    },
  ],
  dueDate: '2025-02-01',
  priority: 'Low',
  category: 'Work',
  createdAt: '2025-01-01T00:00:00Z',
};

const dynamoRecords = {
  Id: '1',
  Description: 'Test task',
  Status: 'Pending',
  SubTasks: [
    {
      Description: 'Sub 1',
      DueDate: '2025-01-01',
      Priority: 1,
      Status: 'Pending',
    },
  ],
  DueDate: '2025-02-01',
  Priority: 'Low',
  Category: 'Work',
  CreatedAt: '2025-01-01T00:00:00Z',
};

describe('putRecord', () => {
  it('sends PutCommand and returns mapped Task', async () => {
    mocks.mockSend.mockResolvedValueOnce({});

    const result = await putRecord(mockTask);

    expect(mocks.mockSend).toHaveBeenCalledWith(expect.any(PutCommand));
    expect(result).toEqual(expect.objectContaining({ id: '1', description: 'Test task' }));
  });
});

describe('updateRecord', () => {
  it('sends UpdateCommand and returns updated Task', async () => {
    const updatedAttrs = {
      Id: '1',
      Description: 'Updated task',
      Status: 'Completed',
      SubTasks: [],
      DueDate: null,
      Priority: 'High',
      Category: 'Work',
      CreatedAt: '2025-01-01T00:00:00Z',
    };
    mocks.mockSend.mockResolvedValueOnce({ Attributes: updatedAttrs });

    const result = await updateRecord('1', 'Completed');

    expect(mocks.mockSend).toHaveBeenCalledWith(expect.any(UpdateCommand));
    expect(result.status).toBe('Completed');
  });
});

describe('getAllRecords', () => {
  it('sends ScanCommand and maps response items', async () => {
    mocks.mockSend.mockResolvedValueOnce({ Items: [dynamoRecords] });

    const result = await getAllRecords();

    expect(mocks.mockSend).toHaveBeenCalledWith(expect.any(ScanCommand));
    expect(result[0].id).toBe('1');
  });
});

describe('getRecordById', () => {
  it('sends QueryCommand and returns mapped records', async () => {
    mocks.mockSend.mockResolvedValueOnce({ Items: [dynamoRecords] });

    const result = await getRecordById('1');

    expect(mocks.mockSend).toHaveBeenCalledWith(expect.any(QueryCommand));
    expect(result[0].id).toBe('1');
  });
});
