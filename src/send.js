require('dotenv').config();
const amqp = require('amqplib/callback_api');
const { AMQP_URL } = process.env;

amqp.connect(AMQP_URL, function(err, conn) {
  const q = 'hello';

  conn.createChannel((err, ch) => {
    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer('Hello World!')); 
    console.log(" [x] Sent 'Hello World!'");
  });

  setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
