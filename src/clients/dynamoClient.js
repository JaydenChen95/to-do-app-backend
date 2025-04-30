import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let docClientInstance;

export function getDocumentClient() {
  if (!docClientInstance) {
    const baseClient = new DynamoDBClient({
      region: 'eu-west-1', // or use process.env.AWS_REGION,
      endpoint: 'http://localhost:8000',
    });

    docClientInstance = DynamoDBDocumentClient.from(baseClient, {
      marshallOptions: {
        removeUndefinedValues: true,
      },
    });
  }

  return docClientInstance;
}