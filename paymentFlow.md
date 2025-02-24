Example Workflow
Scenario 1: Client Pays Immediately
Client places an order.

Order is added to the order queue.

Backend worker moves the order to the payment queue and sets a 15-minute delayed message.

Client pays immediately.

Payment gateway sends a webhook to your backend.

Backend:

Looks up the order in the payment queue.

Marks the order as paid.

Updates the database (deducts stock).

Removes the order from the payment queue.

Notifies the customer.

Scenario 2: Client Does Not Pay Within 15 Minutes
Client places an order.

Order is added to the order queue.

Backend worker moves the order to the payment queue and sets a 15-minute delayed message.

Client does not pay within 15 minutes.

Delayed message is triggered.

Background worker:

Cancels the order.

Reverts the stock.

Removes the order from the payment queue.

Notifies the customer.