const { consumeQueue } = require("./consumeQueue");

async function processPayment(payment) {
  // Process payment, update database stuff

  console.log("Payment processed:", payment);
}

async function consumePaymentQueue() {
  const paymentQueue = "queue.payment";

  consumeQueue(paymentQueue, processPayment);
}

module.exports = {
  consumePaymentQueue,
};
