## to-do-app-backend
Backend for todo app

# To run locally
1. Make sure docker is installed and running
2. Run `npm install`
3. Run `docker run -p 8000:8000 amazon/dynamodb-local` to create a local version of dynamoDB
4. Create table 
```
aws dynamodb create-table \                                              
  --table-name Tasks \
  --attribute-definitions AttributeName=Id,AttributeType=S \
  --key-schema AttributeName=Id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url http://localhost:8000
```