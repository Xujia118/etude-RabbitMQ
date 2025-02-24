const amqp = require("amqplib");
const AMQP_URL = `amqp://localhost:5672`;

async function sendToQueue(queueName, data) {
  try {
    // Create connection and channel
    const connection = await amqp.connect(AMQP_URL);
    const channel = await connection.createChannel();

    // Assert would create a queue if it doesn't exist
    await channel.assertQueue(queueName);

    // Then send the message
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));

    // Close the channel and connection
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);  
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendToQueue };
