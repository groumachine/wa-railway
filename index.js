const express = require("express");
const { create } = require("@open-wa/wa-automate");

const app = express();
const PORT = process.env.PORT || 3000;

create({
  headless: true,
  qrTimeout: 0,
  authTimeout: 0,
  blockCrashLogs: true,
  disableSpins: true,
  disableWelcome: true,
  logConsole: false,
  popup: false
}).then((client) => {
  let qrCode;

  client.onStateChanged((state) => {
    console.log("Estado:", state);
  });

  client.onStreamChange((state) => {
    console.log("Stream:", state);
  });

  client.onAnyMessage((message) => {
    console.log("Mensaje recibido:", message.body);
  });

  client.onMessage(async (message) => {
    if (message.body === "hola") {
      await client.sendText(message.from, "Hola, soy tu bot 🤖");
    }
  });

  client.on("qr", (base64Qr) => {
    qrCode = base64Qr;
    console.log("QR disponible por /qr");
  });

  app.get("/qr", (req, res) => {
    if (qrCode) {
      res.send(`<img src="${qrCode}" />`);
    } else {
      res.send("QR no generado aún, intenta en unos segundos.");
    }
  });

  app.get("/", (req, res) => {
    res.send("Bot WA operativo");
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
