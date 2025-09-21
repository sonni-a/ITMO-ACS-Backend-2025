import amqplib from 'amqplib';

let channel: amqplib.Channel;

export async function connectRabbit() {
  if (channel) return { channel };

  const connection = await amqplib.connect(process.env.RABBITMQ_URL!);
  channel = await connection.createChannel();

  const userQueue = 'user_created_events';
  await channel.assertQueue(userQueue, { durable: true });
  channel.consume(userQueue, (msg) => {
    if (msg) {
      const user = JSON.parse(msg.content.toString());
      console.log(`Received new user event:`, user);
      channel.ack(msg);
    }
  });

  const workoutQueue = 'workout_created_events';
  await channel.assertQueue(workoutQueue, { durable: true });
  channel.consume(workoutQueue, (msg) => {
    if (msg) {
      const workout = JSON.parse(msg.content.toString());
      console.log(`Received new workout event:`, workout);
      channel.ack(msg);
    }
  });

  console.log('RabbitMQ consumers started for user and workout events');
  return { channel };
}