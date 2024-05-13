import amqp from "amqplib";

let channel: amqp.Channel;
let connection: amqp.Connection;

const QUEUE = "queue-das-pamonhas";

async function connectQueue() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE);
    console.log(`[PUBLISHER] Connected to the channel '${QUEUE}'`);
  } catch (error) {
    console.log(error);
  }
}

async function sendData(data: any) {
  // send data to queue
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)));
  console.log(
    `[PUBLISHER] Successfully sent a content to the channel '${QUEUE}'`
  );

  // close the channel and connection
  await channel.close();
  await connection.close();
  console.log(
    `[PUBLISHER] Successfully close the connection with the channel '${QUEUE}'`
  );
}

export async function main() {
  console.log("[PUBLISHER] Send service is live!");
  await connectQueue();
  sendData({
    flavor: "SWEET",
    size: "BIG",
  });
}

main();
