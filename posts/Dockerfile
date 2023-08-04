FROM node:alpine

LABEL authors="cj"

WORKDIR /APP

COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]

#ENTRYPOINT ["sh", "-c"]