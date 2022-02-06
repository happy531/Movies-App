FROM node:14.16.0-alpine3.10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build // for deployment
EXPOSE 3000
CMD ["npm","start"]