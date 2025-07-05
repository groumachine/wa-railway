# Usa una imagen base con Chromium preinstalado
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Crea el directorio de trabajo
WORKDIR /app

# Copia el contenido del proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto que uses (por ejemplo, 3000)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
