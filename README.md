# RabbitMQ with Node.js

A minimal publisher/subscriber example using RabbitMQ and TypeScript.

## Project goal

Demonstrate the basic message flow between independent processes through a durable queue.

## Features

- Publish messages to a queue
- Consume messages in a separate process
- Provision RabbitMQ with Docker Compose

## Technologies

- **TypeScript**
- **Node.js**
- **RabbitMQ**
- **amqplib**
- **Docker Compose**

## What I learned

- Separating message producers from consumers
- Connecting Node.js processes to RabbitMQ
- Declaring and consuming queues
- Using a message broker for asynchronous communication

## Running locally

```bash
npm install
docker compose up -d
npm run start:subscriber
# In another terminal:
npm run start:publisher
```

## Project status

This is a learning and experimentation repository. It documents the concepts practiced at the time and is not presented as a production-ready application.
