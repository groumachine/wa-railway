const { create } = require('@open-wa/wa-automate');

create({
  sessionId: 'session',
  multiDevice: true,
  authTimeout: 120,
  qrTimeout: 0,
  killProcessOnBrowserClose: false,
  headless: true,
  disableSpins: true,
  useChrome: false
})
  .then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    if (message.body === 'ping') {
      await client.sendText(message.from, 'pong');
    }
  });
}
