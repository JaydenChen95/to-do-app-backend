# Overview
Backend for [to do app tool](https://github.com/JaydenChen95/to-do-app-tool). This service supports:
1. Creation of new task `POST /to-do`
2. Updating of current task `PUT /to-do/{id}`
3. Get all tasks `GET /to-do`
4. Get task by id `GET /to-do/{id}`
5. Update task status `patch /to-do/{id}`

During creation of task, an `id` will be gneerated and returned to client.

# To run locally
## Prerequisite
1. Make sure `docker` is installed and running
2. `aws-cli` installed

## Usage
1. Run `npm install`
2. Run `docker run -p 8000:8000 amazon/dynamodb-local` to create a local version of dynamoDB
3. Create table in local dynamodb
```
aws dynamodb create-table \                                              
  --table-name Tasks \
  --attribute-definitions AttributeName=Id,AttributeType=S \
  --key-schema AttributeName=Id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url http://localhost:8000
```
4. Run `npm run dev` (supports hot reload)

# Sample requests and response
## POST /to-do
### Request body
```
{
    "description": "Task 1",
    "status": "Uncompleted"
}
```

### Response
```
{
    "id": "8c18ea26-84b4-4c2a-a5ea-325615b78edc",
    "description": "Task 1",
    "status": "Uncompleted",
    "subTasks": [],
    "dueDate": null,
    "priority": null,
    "category": null,
    "createdAt": "2025-04-30T15:08:36.476Z"
}
```

## PUT /to-do/{id}
### Request body
```
{
    "description": "updated description 2",
    "status": "Completed",
    "dueDate": "2025-04-29T16:41:37.822Z"
}
```

### Response
```
{
    "id": "10dac7de-6040-44d2-b529-e52c1e8b81d8",
    "description": "updated description 2",
    "status": "Completed",
    "subTasks": [],
    "dueDate": "2025-04-29T16:41:37.822Z",
    "priority": null,
    "category": null,
    "createdAt": "2025-04-30T06:36:58.536Z"
}
```

## GET /to-do
### Response
```
[
    {
        "id": "5edbda5b-7ec1-4bbd-ac83-3257e33b37fa",
        "description": "task 3",
        "status": "Uncompleted",
        "subTasks": [
            {
                "description": "412",
                "dueDate": "",
                "priority": "",
                "status": "Completed"
            }
        ],
        "dueDate": "2022-12-12T00:00:00.000Z",
        "priority": "High",
        "category": "Personal",
        "createdAt": "2025-04-30T09:13:09.654Z"
    },
    {
        "id": "84129df6-d411-4906-b718-6b9c8fc50d60",
        "description": "123",
        "status": "Uncompleted",
        "subTasks": [],
        "dueDate": null,
        "priority": null,
        "category": null,
        "createdAt": "2025-04-30T13:51:31.923Z"
    },
    {
        "id": "bdec9714-974a-4947-a799-d0b614fa7c39",
        "description": "task 23",
        "status": "Uncompleted",
        "subTasks": [],
        "dueDate": null,
        "priority": null,
        "category": "Others",
        "createdAt": "2025-04-30T09:13:20.579Z"
    },
]
```

## GET /to-do/{id}
### Response
```
{
    "id": "5edbda5b-7ec1-4bbd-ac83-3257e33b37fa",
    "description": "task 3",
    "status": "Uncompleted",
    "subTasks": [
        {
            "description": "412",
            "dueDate": "",
            "priority": "",
            "status": "Completed"
        }
    ],
    "dueDate": "2022-12-12T00:00:00.000Z",
    "priority": "High",
    "category": "Personal",
    "createdAt": "2025-04-30T09:13:09.654Z"
}
```

## PATCH /to-do/{id}
### Request body
```
{
    "status": "Completed"
}
```

### Response
```
{
    "id": "5edbda5b-7ec1-4bbd-ac83-3257e33b37fa",
    "description": "task 1",
    "status": "Completed",
    "subTasks": [],
    "dueDate": "2022-12-12T00:00:00.000Z",
    "priority": null,
    "category": null,
    "createdAt": "2025-04-30T09:13:09.654Z"
}
```

# Test

To run test, run `npm run test`.

# Build Image

To build docker image with `Dockerfile`, run `docker build -t {IMAGE_NAME} .` at root directory.

# Things to take note
1. This service is currently only able to work locally even after building the docker image. This is because URL mapping is still in `localhost`.
2. This service is currently not deployable to any cloud provider.