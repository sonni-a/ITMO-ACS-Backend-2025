import amqplib from 'amqplib';

let channel: amqplib.Channel;

export async function connectRabbit() {
  if (channel) return { channel };

  const connection = await amqplib.connect('amqp://rabbit:rabbitpassword@rabbitmq:5672');
  channel = await connection.createChannel();
  return { channel };
}

export async function sendWorkoutCreatedEvent(workout: { id: number; title: string }) {
  const { channel } = await connectRabbit();
  const queue = 'workout_created_events';
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(workout)));
  console.log(`Workout event sent: ${workout.title}`);
}

export async function consumeEvents() {
  const { channel } = await connectRabbit();

  const userQueue = 'user_created_events';
  await channel.assertQueue(userQueue, { durable: true });
  channel.consume(userQueue, (msg) => {
    if (msg) {
      const user = JSON.parse(msg.content.toString());
      console.log('Received new user event in Workout Service:', user);
      channel.ack(msg);
    }
  });
}