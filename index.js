const { create, ev } = require('@open-wa/wa-automate');
const express = require('express');
const app = express();

let qrImage = '';
const PORT = process.env.PORT || 3000;

create({
  headless: true,
  qrTimeout: 0,
  authTimeout: 0,
  killProcessOnBrowserClose: true,
  multiDevice: true,
  useChrome: true,
}).then(client => {
  console.log('✅ Cliente iniciado');
  
  client.onMessage(async message => {
    if (message.body === 'ping') {
      await client.sendText(message.from, 'pong');
    }
  });
});

// Escuchar eventos del QR
ev.on('qr.**', async qrcode => {
  const qr = await require('qrcode').toDataURL(qrcode);
  qrImage = qr;
  console.log('⚡ QR actualizado');
});

// Ruta principal
app.get('/', (_, res) => {
  res.send(`<h1>WA Automate</h1><p><a href="/qr">Escanear QR</a></p>`);
});

// Ruta para ver QR
app.get('/qr', (_, res) => {
  if (!qrImage) return res.send('Esperando QR...');
  res.send(`<img src="${qrImage}" style="width:300px"/>`);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});
