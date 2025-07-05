const express = require('express');
const { create } = require('@open-wa/wa-automate');
const app = express();
const port = process.env.PORT || 3000;

let clientInstance;

const start = async () => {
  clientInstance = await create({
    headless: true,
    executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome-stable',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    qrTimeout: 0,
    authTimeout: 0,
    killProcessOnBrowserClose: true,
    useChrome: true,
    multiDevice: true
  });
};

app.get('/', (req, res) => {
  res.send('WAHA corriendo correctamente.');
});

app.get('/qr', async (req, res) => {
  if (!clientInstance) {
    return res.status(500).send('WAHA aún no está inicializado.');
  }
  const qr = await clientInstance.getQRRef();
  if (!qr) return res.send('Ya estás logueado.');
  res.send(`<img src="https://api.qrserver.com/v1/create-qr-code/?data=${qr}&size=300x300" />`);
});

start();

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
