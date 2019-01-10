require('dotenv').config();
const amqp = require('amqplib/callback_api');
const { AMQP_URL } = process.env;

amqp.connect(AMQP_URL, function(err, conn) {
  const q = 'hello';
 
  conn.createChannel((err, ch) => {
    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    
    ch.consume(q, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });

  setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
