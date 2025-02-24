const { consumeMessage } = require("./utils/consumeMessage");
const { produceMessage } = require("./utils/produceMessage");

async function processOrder(order) {
  const paymentQueue = "queue.payment";

  // validate order stuff

  // Send the order the payment queue
  await produceMessage(paymentQueue, order);
}

async function consumeOrderQueue() {
  const orderQueue = "queue.order";

  consumeMessage(orderQueue, processOrder);
}

module.exports = {
  consumeOrderQueue,
};
