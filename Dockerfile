# Imagen oficial de Puppeteer con Chromium preinstalado
FROM ghcr.io/puppeteer/puppeteer:latest

# Setea variables necesarias para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable \
    CHROME_BIN=/usr/bin/google-chrome-stable \
    NODE_ENV=production

# Directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala dependencias
RUN npm install

# Expone el puerto que usa tu app
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
