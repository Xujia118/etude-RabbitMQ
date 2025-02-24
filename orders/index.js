const express = require("express");
const app = express();
PORT = 3001;

// Wrapper functions
const { sendToQueue } = require("./service/createQueue");
const { consumeOrderQueue } = require("./service/consumeOrderqueue");
const { consumePaymentQueue } = require("./service/consumePaymentQueue");

// Dummy data
const orderData = require("./data.json");
const queueName = "queue.order";

app.get("/orders", async (req, res) => {
  await sendToQueue(queueName, orderData);
  res.send(orderData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

consumeOrderQueue();
consumePaymentQueue();

