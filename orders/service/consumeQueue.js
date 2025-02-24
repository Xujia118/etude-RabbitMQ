const amqp = require("amqplib");
const AMQP_URL = `amqp://localhost:5672`;

async function consumeQueue(queueName, callback) {
  try {
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

    console.log(`Waiting for messages in ${queueName}`);

    channel.consume(queueName, (message) => {
      if (message) {
        const data = JSON.parse(message.content.toString());
        console.log(`Received from ${queueName}:`, data);

        // Execute the callback function to process the message
        callback(data);

        // Acknowledge the message
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  consumeQueue,
};
