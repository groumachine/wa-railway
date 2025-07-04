
const express = require("express");
const { create } = require("@open-wa/wa-automate");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WAHA_API_KEY || "clave123";

let clientInstance = null;

create({
  multiDevice: true,
  headless: true,
  args: ['--no-sandbox']
}).then(client => {
  clientInstance = client;
  console.log("WAHA listo");

  app.get("/qr", (req, res) => {
    res.send("Cliente conectado. No se requiere QR si ya está logueado.");
  });

  app.post("/sendText", async (req, res) => {
    if (req.query.key !== API_KEY) return res.status(401).send("Unauthorized");
    const { jid, text } = req.body;
    try {
      await client.sendText(jid, text);
      res.send("Mensaje enviado");
    } catch (e) {
      res.status(500).send("Error enviando mensaje");
    }
  });

  app.listen(PORT, () => console.log("Servidor WAHA en puerto", PORT));
});
