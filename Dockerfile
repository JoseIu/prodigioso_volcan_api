FROM node:20-alpine
WORKDIR /src

COPY package.json .
RUN npm install

COPY . .

EXPOSE 4000
ENV NODE_ENV=production

CMD [ "npm","run","dev" ]