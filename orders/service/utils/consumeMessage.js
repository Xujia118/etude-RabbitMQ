const amqp = require("amqplib");
const AMQP_URL = `amqp://localhost:5672`;

// For original consumption function refer to https://github.com/harblaith7/RabbitMQ-Tutorial/blob/main/final/notifications-api/index.js
// Here the difference is I passed in queueName and callback function so that the code is reusable

async function consumeMessage(queueName, callback) {
  try {
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName);

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
  consumeMessage,
};
