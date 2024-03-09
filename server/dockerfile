FROM node:lts-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 7770
CMD ["node", "--env-file", ".env", "dist/app.js"]