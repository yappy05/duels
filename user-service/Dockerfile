FROM node:20-alpine

WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем Prisma schema
COPY prisma ./prisma/

# Генерируем Prisma client
RUN npx prisma generate --schema=prisma/schema.prisma

# Копируем остальной код и собираем приложение
COPY . .
RUN npm run build

# Команда запуска с миграциями
CMD ["npm", "run", "start:prod"]