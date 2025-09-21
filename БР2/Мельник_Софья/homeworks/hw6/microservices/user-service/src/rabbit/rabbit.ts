import amqplib from 'amqplib';

let channel: amqplib.Channel;

export async function connectRabbit() {
  if (channel) return { channel };
  const RABBITMQ_URL = process.env.RABBITMQ_URL!;
  const connection = await amqplib.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  return { channel };
}

export async function sendUserCreatedEvent(user: { id: number; email: string }) {
  const { channel } = await connectRabbit();
  const queue = 'user_created_events';
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));
  console.log(`User event sent: ${user.email}`);
}