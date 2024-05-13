import amqp from "amqplib";

let channel: amqp.Channel;
let connection: amqp.Connection;

const QUEUE = "queue-das-pamonhas";

interface Pamonha {
  flavor: string;
  size: string;
}

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE);
    channel.consume(QUEUE, (data) => {
      if (data) {
        const content = Buffer.from(data.content);
        console.log(`[SUBSCRIBER]: Raw content: ${content}`);
        channel.ack(data);

        if (!content) return;

        const pamonha: Pamonha = JSON.parse(content.toString());
        console.log(
          `[SUBSCRIBER]: Received a pamonha with flavor ${pamonha.flavor} and size ${pamonha.size}`
        );
      }
    });
    console.log(`[SUBSCRIBER] Connected to the channel '${QUEUE}'`);
  } catch (error) {
    console.log(error);
  }
}

export async function main() {
  console.log("[SUBSCRIBER] Send service is live!");
  await connectQueue();
}

main();
