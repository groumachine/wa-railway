const express = require('express');
const { create } = require('@open-wa/wa-automate');
const chromium = require('chromium');

const app = express();
const PORT = process.env.PORT || 3000;

create({
  headless: true,
  executablePath: chromium.path,
  qrTimeout: 0,
  authTimeout: 0,
  puppeteerOptions: {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
}).then(client => {
  console.log("Cliente listo");
}).catch(e => console.error("Error al crear cliente:", e));

app.get('/', (_, res) => res.send('WAHA está corriendo.'));
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));