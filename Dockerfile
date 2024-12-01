FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install openai fs path multer express cors dotenv csv-parser
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]