FROM node:18
EXPOSE 5173
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
CMD [ "npm", "run", "dev" ]