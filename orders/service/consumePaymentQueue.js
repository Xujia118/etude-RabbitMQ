const { consumeMessage } = require("./utils/consumeMessage");

async function processPayment(payment) {
  // Process payment, update database stuff

  console.log("Payment processed:", payment);
}

async function consumePaymentQueue() {
  const paymentQueue = "queue.payment";

  consumeMessage(paymentQueue, processPayment);
}

module.exports = {
  consumePaymentQueue,
};
