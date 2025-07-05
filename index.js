const express = require('express');
const { create } = require('@open-wa/wa-automate');

const app = express();
const port = process.env.PORT || 3000;

let latestQr = null;

create({
  sessionId: "session_" + Date.now(),
  headless: true,
  qrTimeout: 0,
  authTimeout: 60,
  multiDevice: true,
  killProcessOnBrowserClose: true,
  useChrome: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}).then(client => {
  console.log('✅ Cliente WA iniciado');

  client.onStateChanged(state => {
    console.log('🔄 Estado:', state);
    if (['CONFLICT', 'UNLAUNCHED'].includes(state)) {
      client.useHere();
    }
  });

  client.onAnyMessage(msg => {
    console.log('📩 Mensaje recibido:', msg.body);
  });

}).catch(err => {
  console.error('❌ Error al iniciar WA:', err);
});

create({
  sessionId: "session_" + Date.now(),
  headless: true,
  qrTimeout: 0,
  authTimeout: 60,
  multiDevice: true,
  killProcessOnBrowserClose: true,
  useChrome: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
}).then(client => {
  client.on('qr', qr => {
    latestQr = qr;
    console.log("📸 QR generado");
  });
});

// Ruta para mostrar el QR
app.get('/qr', (req, res) => {
  if (!latestQr) return res.send('QR no disponible aún');
  res.send(`
    <html>
      <body>
        <h1>Escaneá este QR</h1>
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(latestQr)}&size=300x300" />
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
