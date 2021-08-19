FROM node:14.14.0-alpine
WORKDIR /src
COPY package.json .
RUN npm install
COPY . .
CMD ["node","app.js"]