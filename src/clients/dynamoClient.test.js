import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { getDocumentClient } from './dynamoClient';

// Mock the DynamoDBClient and DynamoDBDocumentClient
vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: vi.fn(),
}));

vi.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: {
    from: vi.fn(() => ({
      send: vi.fn(),
    })),
  },
}));

describe('getDocumentClient', () => {
  let mockDynamoDBClient;
  let mockDynamoDBDocumentClient;

  beforeEach(() => {
    // Reset the mocks before each test
    vi.clearAllMocks();
    mockDynamoDBClient = DynamoDBClient;
    mockDynamoDBDocumentClient = DynamoDBDocumentClient.from;
  });

  it('should create and return a DynamoDBDocumentClient instance', () => {
    // Call the function
    const result = getDocumentClient();

    // Check if DynamoDBClient was created
    expect(mockDynamoDBClient).toHaveBeenCalledWith({
      region: 'eu-west-1',
      endpoint: 'http://localhost:8000',
    });

    // Check if DynamoDBDocumentClient was called to create the instance
    expect(mockDynamoDBDocumentClient).toHaveBeenCalledWith(expect.any(DynamoDBClient), {
      marshallOptions: { removeUndefinedValues: true },
    });

    // Check if the result is an instance of DynamoDBDocumentClient
    expect(result).toEqual({
      send: expect.any(Function),
    });
  });

  it('should return the same instance when called multiple times', () => {
    // Call getDocumentClient the first time
    const firstCall = getDocumentClient();

    // Call it again
    const secondCall = getDocumentClient();

    // Ensure the same instance is returned
    expect(firstCall).toBe(secondCall);
  });
});
