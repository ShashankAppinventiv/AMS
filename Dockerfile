FROM node:18.16.1-alpine

WORKDIR /app/AMS

COPY package*.json

RUN npm i

COPY ..

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=postgres
ENV DB_USER=postgres
ENV DB_PASSWORD='    '
ENV PORT=3000
ENV SECRET_KEY='s1h2a3'
ENV EMAIL='shashank.kumar@appinventiv.com'
ENV PASSWORD='sglzjktkcybpxrmp'

EXPOSE 3000



CMD ["npm","start"]