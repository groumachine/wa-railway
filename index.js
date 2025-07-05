const express = require('express');
const { create } = require('@open-wa/wa-automate');

const app = express();
let qrData = '';

create({
  sessionId: 'wa_session',
  multiDevice: true,
  headless: true,
  qrTimeout: 0,
  authTimeout: 0,
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  logConsole: false
}).then(client => {
  console.log('WA Cliente iniciado');
  client.onMessage(async message => {
    console.log(`📩 Msg de ${message.sender.pushname}: ${message.body}`);
    if (message.body.toLowerCase() === 'hola') {
      await client.sendText(message.from, 'Hola, soy el bot 🤖');
    }
  });
}).catch(err => console.error('❌ Error iniciando WA:', err));

const { default: createWA } = require('@open-wa/wa-automate');
createWA({
  sessionId: 'wa_session',
  multiDevice: true,
  qrTimeout: 0,
  authTimeout: 0,
  headless: true,
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  logConsole: false,
  qrCallback: base64Qr => {
    qrData = base64Qr;
    console.log('✅ QR capturado');
  }
});

app.get('/qr', (req, res) => {
  if (qrData) {
    res.send(`
      <html><body>
        <h1>Escaneá el QR</h1>
        <img src="${qrData}" />
      </body></html>
    `);
  } else {
    res.send('QR aún no generado. Esperá unos segundos y recargá.');
  }
});

app.listen(3000, () => console.log('Servidor activo en puerto 3000'));
