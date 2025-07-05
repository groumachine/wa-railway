import express from 'express';
import { create } from '@open-wa/wa-automate';

const app = express();
let qrData = '';

create({
  headless: true,
  qrTimeout: 0,
  authTimeout: 60,
  killProcessOnBrowserClose: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  logConsole: false,
  popup: false,
  multiDevice: true,
  sessionId: 'default',
  disableSpins: true,
  cacheEnabled: false,
  chromepath: process.env.CHROME_PATH || '/usr/bin/chromium'
}).then(client => {
  console.log('WhatsApp client initialized');
}).catch(err => console.error(err));

create({
  qrTimeout: 0,
  disableSpins: true,
  headless: true,
  multiDevice: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  chromepath: process.env.CHROME_PATH || '/usr/bin/chromium',
  sessionId: 'default'
}).then(client => {
  app.get('/qr', (_req, res) => {
    if (qrData) {
      res.send(`<img src="${qrData}" />`);
    } else {
      res.send('QR aún no generado.');
    }
  });

  app.listen(3000, () => console.log('🚀 Server on http://localhost:3000/qr'));
}).catch(err => console.error('Init error:', err));
