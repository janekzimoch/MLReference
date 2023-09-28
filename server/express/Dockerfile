FROM node:14

WORKDIR /app

COPY ./app /app

RUN npm install

# RUN npm i --save-dev @types/express
# RUN npm run build

EXPOSE 4002

CMD ["node", "payment.js"]

# "build": "tsc",
# docker build -t express_server .
# docker run -d --name express_server -p 4002:4002 express_server
