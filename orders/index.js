const express = require("express");
const app = express();
PORT = 3001;

// Wrapper functions
const { produceMessage } = require("./service/utils/produceMessage");
const { consumeOrderQueue } = require("./service/consumeOrderQueue");
const { consumePaymentQueue } = require("./service/consumePaymentQueue");

// Dummy data
const orderData = require("./data.json");
const queueName = "queue.order";

// Listen to queues
consumeOrderQueue();
consumePaymentQueue();

app.get("/orders", async (req, res) => {
  await produceMessage(queueName, orderData);
  res.send(orderData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

