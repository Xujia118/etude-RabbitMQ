const { consumeQueue } = require("./consumeQueue");
const { sendToQueue } = require("./createQueue");

async function processOrder(order) {
  const paymentQueue = "queue.payment";

  // validate order stuff

  // Send the order the payment queue
  await sendToQueue(paymentQueue, order);
}

async function consumeOrderQueue() {
  const orderQueue = "queue.order";

  consumeQueue(orderQueue, processOrder);
}

module.exports = {
  consumeOrderQueue,
};
