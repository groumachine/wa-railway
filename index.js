let lastQR; // guarda el último QR

create({
  sessionId: "waha",
  qrTimeout: 0,
  multiDevice: true,
  authTimeout: 60,
  headless: true,
  qrRefreshS: 15,
  qrLogSkip: true,
  killProcessOnBrowserClose: true,
  onQRCodeUpdated: (qrData) => {
    lastQR = qrData;
  }
}).then(client => {
  console.log('WAHA Ready');
});

const express = require('express');
const app = express();

app.get('/qr', (req, res) => {
  if (!lastQR) return res.send('QR no disponible aún.');
  const qrImg = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(lastQR)}&size=300x300"/>`;
  res.send(`<body style="display:flex;align-items:center;justify-content:center;height:100vh;">${qrImg}</body>`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor express iniciado');
});
